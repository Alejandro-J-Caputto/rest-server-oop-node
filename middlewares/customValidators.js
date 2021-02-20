const User = require("../models/usuario");
const AppError = require("../utils/appError");
const { validationResult } = require('express-validator');




exports.emailExist = async( req, res , next) => {

  const {email} = req.body;
  const emailExist = await User.findOne({email});
  if(emailExist) {
    return next(new AppError('There is already an account with the provided email', 400));
  }
  next();
  
}

exports.checkPassword = (req, res ,next) => {

  let {password, passwordConfirm} = req.body;

  if(password === passwordConfirm) {
    passwordConfirm = undefined
    return next();
  }
  if(password !== passwordConfirm) next(new AppError('The password should be equal', 400))
}


exports.checkIdExists = async (req, res ,next) => {

  const {id} = req.params;
  console.log(id)
  const user =  User.findById(req.params.id);
  const document = await user;

  console.log(document);

  if(!user) return next(new AppError('There is not an user with that ID', 400));

  next();
}


exports.validarCampos = ( req, res, next ) => {

  const errors = validationResult(req);
  if( !errors.isEmpty() ){
      return res.status(400).json(errors);

  }

  next();
}