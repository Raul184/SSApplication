const express = require('express');
const {
  getAllReviews,
  getReview,
  createReview,
  setTourUserIds,
  updateReview,
  deleteReview
} = require('./../controllers/reviewController');
const { restrictTo, protect } = require('./../controllers/authController');

const router = express.Router({ mergeParams: true });

router.use(protect);

router.get('/', getAllReviews);
router.post('/', restrictTo('user'), setTourUserIds, createReview);

router.get('/:id', getReview);
router.patch('/:id', restrictTo('user', 'admin'), updateReview);
router.delete('/:id', restrictTo('user', 'admin'), deleteReview);

module.exports = router;
