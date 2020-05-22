const express = require('express');
const router = express.Router();
const toursController = require('./../controllers/toursController')
const {
  getAllTours ,
  getATour ,
  addATour ,
  updateATour ,
  deleteATour ,
  checkBody
} = toursController ;

// PARAMS. Middleware
router.param('id' , ( req , res , next , paramVal ) => {
  console.log(`Tour id is: ${paramVal}`);
  next();
})

router.get( '/' , getAllTours ); 
router.post( '/' , checkBody , addATour )

router.get( '/:id' , getATour )
router.patch( '/:id' , updateATour )
router.delete( '/:id' , deleteATour )



module.exports = router;