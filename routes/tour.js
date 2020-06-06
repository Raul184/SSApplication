const express = require('express');
const router = express.Router();
const toursController = require('./../controllers/toursController')
const authController = require('./../controllers/authController')
const {
  getAllTours ,
  getATour ,
  addATour ,
  updateATour ,
  deleteATour ,
  top5 ,
  getTourStats ,
  getMonthlyToursAccounting
} = toursController 
const { protect , restrictTo } = authController

// BUSINESS
// Top 5 
router.get( '/top-5' , top5 , getAllTours )
// Get Stats
router.get( '/stats' , getTourStats )
// Monthly Check
router.get( '/monthly-plan/:year' , getMonthlyToursAccounting )


// LOGISTIC
router.get( '/' , protect , getAllTours ); 
router.post( '/' ,  addATour )

router.get( '/:id' , getATour )
router.patch( '/:id' , updateATour )
router.delete( '/:id' , protect , restrictTo('admin' , 'lead-guide') , deleteATour )



module.exports = router;