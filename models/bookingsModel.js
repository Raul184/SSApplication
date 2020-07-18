const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: 'Tour',
    required: [true , 'A booking needs a selected tour']
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true , 'A booking needs a selected tour']
  },
  price: {
    type: Number,
    required: [true , 'Please check the price for your booking']
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  paid: {
    type: Boolean,
    default: true
  }
});
// Query Middleware
bookingSchema.pre(/^find/, function(next){
  this.populate('user').populate({
    path: 'tour',
    select: 'name'
  })
  next();
})

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;