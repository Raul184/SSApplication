const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/usersController');
const {
  getAllUsers
} = usersController



// GET all users
router.get('/', getAllUsers );


module.exports = router;