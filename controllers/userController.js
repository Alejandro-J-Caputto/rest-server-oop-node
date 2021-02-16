const {request, response} = require('express');


 exports.getUsers = (req = request, res = response) => {

  const query = req.query;
  console.log(query)

  res.status(200).json({
    status: 'success',
    message: 'Hello getUsers'
  })
}
 exports.createUser = (req, res) => {
  const body = req;
  console.log(body)
  res.status(201).json({
    status: 'success',
    body
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

