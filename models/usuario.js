const validator = require('validator');

const {Schema, model} = require('mongoose');

const UserSchema = Schema({

  name: {
    type: String,
    require: [true, 'The name is required'],
    trim: true
  },
  email: {
    type: String, 
    require: [true, 'Please provide a valid email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a valis password'],
    select: false
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Plase write agagin your password to confirm'],
    validate: {
      validator: function(el) {
        return el === this.password;
      },
      message: 'Password doesnt match one with each other'
    }
  },
  img: {
    type: String
  },
  role: {
    type: String,
    enum: ['USER_ROLE', 'ADMIN', 'EMPLOYEE'],
    default: 'USER_ROLE'
  },
  active: {
    type: Boolean,
    default: true,
    select: false
  },
  google: {
    type: Boolean,
    default: false
  }

});
const User = model('User', UserSchema);
module.exports = User;