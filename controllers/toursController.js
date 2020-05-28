const TourModel = require('../models/tours');
const AppErrors = require('./../utils/AppErrors');

// GET Top 5
exports.top5 = async( req , res, next ) => {
  req.query.limit = '5' ,
  req.query.sort = '-ratingsAverage' ,
  req.query.fields = 'name,price,ratingsAverage,summary,difficulty'

  next();
}

// GET ALL
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
    const limit = req.query.limit * 1 || 9
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


// GET Selected Tour
exports.getATour = async ( req , res , next) => {
  try {
    const tour = await TourModel.findById( req.params.id ) 
    
    if(!tour) return next( 
      new AppErrors( 'No tour found under that ID' , 404 )
    )

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


// CREATE A Tour
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


// UPDATE A Tour
exports.updateATour = async ( req , res , next) => {
  try {
    const tour = await TourModel.findByIdAndUpdate( 
      req.params.id , 
      req.body ,
      {
        new: true ,
        runValidators: true ,
        context: 'query'
      }
    ) 
    
    if(!tour) return next( 
      new AppErrors( 'No tour found under that ID' , 404 )
    )

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


// DELETE 
exports.deleteATour = async ( req , res, next) => {
  try {
    const tour = await TourModel.findByIdAndDelete( req.params.id ) 
    
    if(!tour) return next( 
      new AppErrors( 'No tour found under that ID' , 404 )
    )

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

// =================================================================================
//                                    AGREGATION PIPELINES
// =================================================================================
exports.getTourStats = async ( req , res ) => {
  try {
    const stats = await TourModel.aggregate([{
        $match: { ratingsAverage: { $gte: 4.5 } }
      },
      {
        $group: {
          _id: { $toUpper: '$difficulty' } ,
          numTours: { $sum: 1 } ,
          numRatings: { $sum: '$ratingsQuantity' } ,
          avgRating: { $avg: '$ratingsAverage' } ,
          avgPrice: { $avg: '$price' } ,
          minPrice: { $min: '$price'} ,
          maxPrice: { $max: '$price'}
        }
      }
      // {
      //   $sort: { $avgPrice: 1 }
      // }
      // {
      //   $match: { _id: { $ne: 'EASY' }}
      // }
    ])

    return res.status(200).json({
      status: 'success' ,
      data: {
        stats
      }
    })
  } 
  catch (error) {
    res.status(404).json({ msg: "Not found" })  
  }
}


exports.getMonthlyToursAccounting = async ( req , res ) => {
  try {
    const year = req.params.year * 1 //2021
    
    const plan = await TourModel.aggregate([
      { // deconstruct arr & output 1 doc / every el in the arr
        $unwind: '$startDates' 
      },
      {
        $match: {
          startDates: {
            $gte: new Date(`${year}-01-01`) ,
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: { 
            $month: '$startDates' 
          },
          numTourStarts: { $sum: 1 } ,
          tours: { $push: name }
        }
      },
      {
        $addFields: { month: '$_id'}
      },
      {
        $project: { // hide this field 
          _id: 0 
        }
      },
      {
        $sort: { numTourStarts: - 1 }
      }
      // {  to limit output
      //   $limit: {}
      // }
    ])

    return res.status(200).json({
      status: 'success' ,
      data: {
        plan
      }
    })
  } 
  catch (error) {
    res.status(404).json({ msg: "Not found" })
    
  }
}