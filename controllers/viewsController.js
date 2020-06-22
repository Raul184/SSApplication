const TourModel = require('../models/tourModel');
const AppError = require('../utils/appError');


exports.getOverview = async function(req, res, next) {
  try {
    // Get data
    const tours = await TourModel.find()
    // Build template
  
    // Render
    return res.status(200).render('overview' , {
      title: 'All Tours',
      tours
    })
    
  } 
  catch (error) {
    return res.status(500).json({
      message: error.message
    })  
  }
}

exports.getTour = async function(req, res, next) {
  try {
    // Get data for tour 
    const tour = await TourModel.findOne({ slug: req.params.slug })
    .populate({ 
      path: 'reviews' , 
      fields: 'review rating user'
    })
    if(!tour){
      return res.status(404).render('error', {
        error: `Sorry , we don't have any tour under that name`
      })
    }
    return res.status(200).render('tour' , {
      title:  `${tour.name}`,
      tour
    })
  } 
  catch (error) {
    return res.status(500).json({
      message: error.message
    })  
  }
}

exports.logUserIn = function(req, res, next) {
  return res.status(200).render('login', {
    title:'Log into your account'
  })
}
exports.signUserUp = function(req, res, next) {
  return res.status(200).render('signup', {
    title:'Sign up'
  })
}