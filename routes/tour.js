const express = require('express');
const router = express.Router();
const toursController = require('./../controllers/toursController')
const {
  getAllTours ,
  getATour ,
  addATour ,
  updateATour ,
  deleteATour
} = toursController ;


// GET all tours
router.get( '/' , getAllTours );



// Get 1 tour
router.get( '/:id' , getATour )



// ADD a new tour
router.post( '/' , addATour )



// Update a tour
router.patch( '/:id' , updateATour )



// Delete a tour
router.delete( '/:id' , deleteATour )



module.exports = router;