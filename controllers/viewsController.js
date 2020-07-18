const TourModel = require('../models/tourModel');
const AppError = require('../utils/appError');
const BookingModel = require('../models/bookingsModel');
const catchAsync = require('../utils/catchAsync');


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
    console.log('Params Slug:', req.params)
    // Get data for tour 
    const tour = await TourModel.findOne({ slug: req.params.slug })
    .populate({ 
      path: 'reviews' , 
      fields: 'review rating user'
    })
    if(!tour){
      return next(new AppError('Sorry, no tour registered under that name',404))
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

exports.getProfile = function(req,res,next){
  return res.status(200).render('profile', {
    title: 'Your stuff'
  })
}

exports.getMyTours = catchAsync(async function(req,res,next){
  const myBookings = await BookingModel.find({ user: req.user.id })
  const tourIds = myBookings.map(el => el.tour)
  const tours = await TourModel.find({ _id: { $in: tourIds}})// All
  return res.status(200).render('overview' , {
    title: 'My tours',
    tours
  })
})