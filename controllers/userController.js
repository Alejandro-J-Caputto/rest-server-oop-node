const {request, response} = require('express');
const User = require('../models/usuario');

 exports.getUsers = (req = request, res = response) => {

  const query = req.query;
  console.log(query)

  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers'
  })
}
 exports.createUser = async (req, res) => {
  const { body } = req;
  
  const newUser = await User.create({
    name: body.name,
    email: body.email,
    password: body.password,
    passwordConfirm: body.passwordConfirm
  })

  console.log(body)
  res.status(201).json({
    status: 'success',
    data: {
      newUser
    }
  })
}
 exports.getUserById = (req, res) => {
  const userId = req.params.id;
  console.log(userId)
  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers'
  })
}
 exports.deleteUser = (req, res) => {

  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers'
  })
}
 exports.editUser = (req, res) => {

  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers'
  })
}

