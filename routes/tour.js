const express = require('express');
const router = express.Router();
const toursController = require('./../controllers/toursController')
const {
  getAllTours ,
  getATour ,
  addATour ,
  updateATour ,
  deleteATour ,
  top5
} = toursController ;


// Top 5 
router.get( '/top-5' , top5 , getAllTours )

router.get( '/' , getAllTours ); 
router.post( '/' ,  addATour )

router.get( '/:id' , getATour )
router.patch( '/:id' , updateATour )
router.delete( '/:id' , deleteATour )



module.exports = router;