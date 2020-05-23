const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String ,
    required: [ true , 'Please provide a name' ] ,
    unique: true 
  } ,
  rating: {
    type: Number ,
    default: 4.5 ,
    max: 5 ,
    min: 1
  },
  price: {
    type: Number ,
    required: [ true , 'Please provide a price' ]
  }
})

const TourModel = mongoose.model('Tour' , tourSchema );

module.exports = TourModel;