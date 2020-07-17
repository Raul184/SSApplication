const express = require('express');
const { getCheckoutSession } = require('../controllers/bookingController');
const { protect , restrictTo} = require('../controllers/authController');

const router = express.Router()

router.use(protect)
router.get('/checkout-session/:tourID', getCheckoutSession )

router.use(restrictTo('admin'))


module.exports = router;