const express = require('express');
const { getCheckoutSession, getAllBookings, createBooking, getBooking, updateBooking, deleteBooking } = require('../controllers/bookingController');
const { protect , restrictTo} = require('../controllers/authController');

const router = express.Router()

router.use(protect)
router.get('/checkout-session/:tourID', getCheckoutSession )

router.use(restrictTo('admin'))
router.get('/', getAllBookings)
router.post('/', createBooking)
router.get('/:id', getBooking)
router.patch('/:id', updateBooking)
router.delete('/:id', deleteBooking)

module.exports = router;