const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { isEmail } = require('validator');

const UserSchema = new mongoose.Schema({
  firstName: {
    type:String,
    required:[true, 'First name is required']
  },
  lastName: {
    type:String,
    required:[true, 'Last name is required']
  },
  username: {
    type:String,
    required:[true, 'Username name is required']
  },
  email:{
    type:String,
    required:[true, 'Email name is required'],
    validate:[isEmail, 'Not a valid email']
  },
  password:{
    type:String,
    required:[true, 'First name is required'],
    minLength:[8, 'Password must be at least 8 characters']
  }
}, {timestamps:true})

// * middleware 
UserSchema.virtual('confirmPassword')
  .get(() => this.confirmPassword)
  .set( value => this.confirmPassword = value)

UserSchema.pre('validate', function(next){
  if(this.password !== this.confirmPassword){
    this.invalidate('confirmPassword', 'Passwords do not match')
  }
  next();
});

UserSchema.pre('save', function(next){
  bcrypt.hash(this.password, 10)
    .then(hash => {
      this.password = hash;
      next();
    });
});


module.exports = mongoose.model('User', UserSchema);