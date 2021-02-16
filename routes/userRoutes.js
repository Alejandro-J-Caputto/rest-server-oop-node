const express = require('express')
const { 
  getUsers, 
  createUser,
  getUserById,
  deleteUser,
  editUser } = require('../controllers/userController');

const router = express.Router()


router.route('/')
  .get(getUsers)
  .post(createUser);
router.route('/:id')
  .get(getUserById)
  .patch(deleteUser)
  .put(editUser)


module.exports = router;