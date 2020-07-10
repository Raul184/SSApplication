const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)
const catchAsync = require("../utils/catchAsync");
const TourModel = require('../models/tourModel')
const AppError = require('../utils/appError')

exports.getCheckoutSession = catchAsync( async (req, res, next) => {
  // 1 Get booked tour
  const tour = await TourModel.findById(req.params.tourID)
  // 2 Create stripe Checkout Session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourID,
    line_items: [{ 
      name: `${tour.name} tour`,
      description: tour.summary ,
      images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
      amount: tour.price * 100,
      currency: 'usd',
      quantity: 1
    }]
  });
  return res.status(200).json({
    status: 'success',
    session
  })

})