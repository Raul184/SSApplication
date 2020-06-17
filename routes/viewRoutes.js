const express = require('express');
const router = express.Router();
const { 
  getOverview ,
  getTour 
} = require('../controllers/viewsController');

// HomePage
router.get('/', getOverview);

router.get('/tours/:slug', getTour);


module.exports = router;