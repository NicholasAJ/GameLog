const User = require('../models/userModel');
const secret = process.env.SECTRET_KEY;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

module.exports = {
  registerUser: async (req, res) => {
    try{
      const potentialUser = await User.findOne({email:req.body.email})
      if(potentialUser){
        res.status(400).json({message: 'That email already exists, please login'})
      }else{
        const newUser = await User.create(req.body)
        res.status(201).json(newUser);
      }
    }
    catch(err){
      res.status(400).json({error:err});
    }
  }
}