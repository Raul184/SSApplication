const express = require('express');
const router = express.Router();
const { 
  getOverview,
  getTour,
  logUserIn,
  signUserUp
} = require('../controllers/viewsController');
const {
  isLoggedIn
} = require('../controllers/authController');

// User logged in?
router.use(isLoggedIn)
// HomePage
router.get('/', getOverview)
router.get('/tours/:slug', getTour)
router.get('/login' , logUserIn)
router.get('/signup', signUserUp)
module.exports = router;