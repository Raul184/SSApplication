const express = require('express');
const {
  getMe,
  updateMe,
  deleteMe,
  getUser,
  createUser,
  getAllUsers,
  updateUser,
  deleteUser
} = require('./../controllers/userController');
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  protect,
  updatePassword,
  restrictTo,
  logout
} = require('./../controllers/authController');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.get('/logout', logout)
router.post('/forgotPassword', forgotPassword);
router.patch('/resetPassword/:token', resetPassword);

// Protect all routes after this middleware
router.use(protect);

router.patch('/updateMyPassword', updatePassword);
router.get('/me', getMe, getUser);
router.patch('/updateMe', updateMe);
router.delete('/deleteMe', deleteMe);

router.use(restrictTo('admin'));

router.get('/' ,getAllUsers)
router.post('/', createUser);
  
router.get('/:id',getUser)
router.patch('/:id',updateUser)
router.delete('/:id',deleteUser);

module.exports = router;
