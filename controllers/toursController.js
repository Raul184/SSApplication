const TourModel = require('../models/tours');


exports.getAllTours = async (req, res, next) => {
  try {
    // 1.a ) Filtering
    const queryObj = { ...req.query }
    const excludeFields = [ 'page' , 'sort' , 'limit' , 'fields' ]
    excludeFields.forEach(el => delete queryObj[el])

    // 1.b ) Advance Filtering
    let queryStr = JSON.stringify(queryObj)
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g , match => `$${match}`);
    
    // *
    let query = TourModel.find(JSON.parse( queryStr ))
    
    // 2 ) Sorting
    if(req.query.sort){
      // + 1 filter ?
      const allSorts = req.query.sort.split(',').join(' ')
      query = query.sort( allSorts )
    }
    else{ // default sort implemented
      query = query.sort( '-createdAt' )
    }

    // 3 ) Field Limiting
    if(req.query.fields){
      const fields = req.query.fields.split(',').join(' ')
      query = query.select(fields)
    } 
    else {
      query = query.select('-__v')
    }

    // 4 ) Pagination
    const page = req.query.page * 1 || 1
    const limit = req.query.limit * 1 || 1
    const skip = ( page - 1 ) * limit

    query = query.skip(skip).limit(limit)

    if(req.query.page){
      const numTours = await TourModel.countDocuments();
      if( skip >= numTours ) throw new Error( 'Not more tours available')
    }
    // *
    const tours = await query;

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
      msg: error.message
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


