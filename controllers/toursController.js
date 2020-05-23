const TourModel = require('../models/tours');


exports.getAllTours = async (req, res, next) => {
  try {
    const tours = await TourModel.find()
    
    return res.status(200).json({
      status: 'success' ,
      result: tours.length ,
      data: {
        tours
      }
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.getATour = async ( req , res , next) => {
  try {
    const tour = await TourModel.findById( req.params.id ) 
    
    return res.status(200).json({
      status: 'success' ,
      data: {
        tour
      }
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


exports.addATour = async ( req , res , next ) => {
  try {
    const newTour = await TourModel.create( req.body )
    
    return res.status(200).json({
      status: 'success' ,
      data: {
        tour: newTour
      }
    })  
  } 
  catch (error) {
    return res.status(400).json({
      status: 'failed' ,
      msg: error
    })
  }
}



exports.updateATour = async ( req , res , next) => {
  try {
    const tour = await TourModel.findByIdAndUpdate( 
      req.params.id , 
      req.body ,
      {
        new: true ,
        runValidators: true
      }) 
    
    return res.status(200).json({
      status: 'success' ,
      data: {
        tour
      }
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}



exports.deleteATour = async ( req , res, next) => {
  try {
    await TourModel.findByIdAndDelete( req.params.id ) 
    
    return res.status(204).json({
      status: 'success' ,
      data: null
    })
  } 
  catch (error) {
    return res.status(404).json({
      status: 'failed' ,
      msg: error
    })  
  }
}


