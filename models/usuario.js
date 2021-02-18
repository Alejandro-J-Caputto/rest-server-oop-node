const validator = require('validator');
const bcrypt = require('bcryptjs');

const {Schema, model} = require('mongoose');

const UserSchema = Schema({

  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true
  },
  email: {
    type: String, 
    required: [true, 'Please provide a valid email'],
    unique: true,
    validate: [validator.isEmail, 'Please provide a valid email']
  },
  password: {
    type: String,
    required: [true, 'Please provide a valis password'],
    select: false
  },
  // passwordConfirm: {
  //   type: String,
  //   required: [true, 'Plase write agagin your password to confirm'],
  //   validate: {
  //     validator: function(el) {
  //       return el === this.password;
  //     },
  //     message: 'Password doesnt match one with each other'
  //   }
  // },
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
// UserSchema.pre('save', async function(next) {

//   if(!this.isModified('password')) return next();

//   this.password = await bcrypt.hash(this.password, 12);

//   this.passwordConfirm = undefined;
//   next();
// })


const User = model('User', UserSchema);
module.exports = User;