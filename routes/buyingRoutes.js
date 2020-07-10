const express = require('express');
const { getCheckoutSession } = require('../controllers/buyingController');
const { protect } = require('./../controllers/authController');

const router = express.Router()

router.get('/checkout_session/:tourID', protect , getCheckoutSession )



module.exports = router;