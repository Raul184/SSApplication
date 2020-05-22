const express = require('express');
const router = express.Router();


// GET all tours
router.get('/', function(req, res, next) {
  return res.status(200).json({
    status: 'success' 
  })
});


module.exports = router;