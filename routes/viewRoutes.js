const express = require('express');
const router = express.Router();
const { 
  getOverview,
  getTour,
  logUserIn,
  signUserUp,
  getProfile
} = require('../controllers/viewsController');
const {
  isLoggedIn,
  protect
} = require('../controllers/authController');

// User logged in?
// HomePage
router.get('/', isLoggedIn,getOverview)
router.get('/tours/:slug', isLoggedIn,getTour)
router.get('/login' , isLoggedIn,logUserIn)
router.get('/signup', signUserUp)
router.get('/me', protect, getProfile)
module.exports = router;