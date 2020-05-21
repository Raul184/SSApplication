const express = require('express');
const router = express.Router();


// GET all tours
router.get('/', function(req, res, next) {
  return res.status(200).json({
    status: 'success' ,
    result: 10 ,
    data: {
      tours: 20
    }
  })
});

// ADD a new tour
router.post( '/' , function( req , res , next ){
  
})



module.exports = router;