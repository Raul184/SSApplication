const mongoose = require('mongoose');
const slugify = require('slugify');


const tourSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide a name' ] ,
    unique: true ,
    trim: true ,
    validate: {
      validator: function (v) { return v.length <= 40 },
      message: props => `${props.value} is too long , less than 40 chars. please`
    }
  } ,
  slug: String ,
  duration: {
    type: Number ,
    required: [ true , 'How long does it take?' ]
  },
  maxGroupSize: {
    type: Number ,
    required: [ true , 'Please provide number of people' ]
  },
  difficulty: {
    type: String ,
    required: [ true , 'Please provide level of difficulty for our customers' ] ,
    enum: {
      values: [ 'easy' , 'medium' , 'difficult' ] ,
      message: 'Please , only easy / medium or difficult allowed , xD'
    }
  },
  ratingsAverage: {
    type: Number ,
    default: 4.5 ,
    min: [ 1 , 'Rating must be above 1' ] ,
    max: [ 5 , 'Maximum rate is 5' ]
  },
  ratingsQuantity: {
    type: Number ,
    default: 0
  },
  price: {
    type: Number ,
    required: [ true , 'Please provide a price' ]
  },
  priceDiscount: {
    type: Number ,
    validate: {
      validator: function( val ) { return val < this.price } ,
      message: 'Input a discount lower than the current price for the tour'
    }
  },
  summary: {
    type: String ,
    trim: true
  },
  description: {
    type: String ,
    trim: true
  },
  imageCover: {
    type: String ,
    required: [ true , 'Please provide an image for the tour']
  },
  images: [ String ] ,
  createdAt: {
    type: Date ,
    default: Date.now() ,
    select: false
  },
  startDates: [ Date ] ,
  secretTour: {
    type: Boolean ,
    default: false 
  },
  startLocation: {
    // GeoJSON
    type: {
      type: String,
      default: 'Point',
      enum: ['Point']
    }, // lat | long
    coordinates: [Number],
    address: String,
    description: String
  },
  locations:[
    {
      type: {
        type: String ,
        default: 'Point',
        enum: ['Point']
      }, // lat | long
      coordinates: [Number],
      address: String,
      description: String ,
      day: Number
    }
  ], // By reference
  guides: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    }
  ],
}, 
{ // 1* Virtual var
  toJSON: { virtuals: true } ,
  toObject: { virtuals: true }
})
  // 2* Virtual var 
tourSchema.virtual( 'durationWeeks' ).get( function() {
  return this.duration / 7
})


// // DOCUMENT Middleware ( Before / After  => event )
tourSchema.pre( 'save' , function( next ) {
  this.slug = slugify( this.name , { lower: true })
  next()
})


// QUERY Middleware ( Before any Query  => executed )
tourSchema.pre( /^find/ , function( next ){
  this.find({ secretTour: { $ne: true } })
  next()
})

// Neglecting DBfields
tourSchema.pre(/^find/ , function(next){
  this.populate({
    path: 'guides',
    select: '-__v'
  }); 
  next()
})

// AGGREGATION Middleware
tourSchema.pre( 'aggregate' , function( next ) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } }})
  next()
})



const TourModel = mongoose.model('tours' , tourSchema );

module.exports = TourModel;