const express = require('express');
const {
  addUser,
  editUser,
  deleteUser,
  getUsers
} = require('../controllers/userController');

const router = express.Router();

router.post('/users', addUser);
router.put('/users/:id', editUser);
router.delete('/users/:id', deleteUser);
router.get('/users', getUsers);

module.exports = router;