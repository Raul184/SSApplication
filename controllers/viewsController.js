const TourModel = require('../models/tourModel');

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
    return res.status(200).render('tour' , {
      tour
    })
  } 
  catch (error) {
    return res.status(500).json({
      message: error.message
    })  
  }
}