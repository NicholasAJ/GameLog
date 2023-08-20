const User = require('../models/userModel');
const secret = process.env.SECRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  registerUser: async (req, res) => {
    try{
      // * checking if email exists
      const potentialUser = await User.findOne({email:req.body.email})
      if(potentialUser){
        res.status(400).json({message: 'That email already exists, please login'})
      }else{
        // * create user
        const newUser = await User.create(req.body)
        // * generate userToken(json web token), stores the id and email of brand new user
        const userToken = jwt.sign({_id: newUser._id, email:newUser.email}, secret, {expiresIn:'2h'})
        // * sending user data to client
        console.log(userToken);
        // * added cookie  to the details we send to the client, the cookie will expire in 2 hours
        // * you have to put it in miliseconds, maxAge:(miliseconds)
        // * name of cookie is userToken!!!
        res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(newUser);
      };
    }
    catch(err){
      res.status(400).json({error:err});
    };
  },

  loginUser: async (req,res) => {
    console.log('login controller')
    try {
      // * check if email(user) is in database/already exists
      const user = await User.findOne({email:req.body.email})
      if(user){
        // * check if password entered matches password in DB (hashed), will salt pw from form and compare
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password)
        if(passwordsMatch) {
          // * generate userToken
          const userToken = jwt.sign({_id: user._id, email:user.email}, secret, {expiresIn:'2h'})
          console.log(userToken);
          // * log user in
          res.status(201).cookie('userToken', userToken, {httpOnly:true, maxAge:2*60*60*1000}).json(user);
        }else{
          // * if the email does exist but password does not match
          res.status(400).json({ message:'Invalid email/password' })
        }
      }
      // * if user doesn't exist
      else{
        res.status(400).json({message:'Invalid email/password'});
      };
    }
    catch(err){
      res.status(400).json({error:err});
    };
  },
  logout: (req,res) => {
    res.clearCookie('userToken').json({message:'You logged out'})
  }
};