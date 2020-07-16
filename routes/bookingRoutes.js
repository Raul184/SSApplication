const express = require('express');
const { getCheckoutSession } = require('../controllers/bookingController');
const { protect , restrictTo} = require('../controllers/authController');

const router = express.Router()

router.use(protect)
router.get('/checkout_session/:tourId', getCheckoutSession )



module.exports = router;