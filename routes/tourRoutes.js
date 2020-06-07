const express = require('express');
const {
  getTourStats,
  aliasTopTours,
  getAllTours,
  getTour,
  updateTour,
  createTour,
  deleteTour,
  getMonthlyPlan,
  getToursWithin,
  getDistances
} = require('./../controllers/tourController');
const { restrictTo, protect } = require('./../controllers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

// router.param('id', tourController.checkID);

// POST /tour/234fad4/reviews
// GET /tour/234fad4/reviews

router.use('/:tourId/reviews', reviewRouter);

router.get('/top-5-cheap', aliasTopTours, getAllTours);

router.get('/tour-stats', getTourStats);
router.get(
  '/monthly-plan/:year',
  protect,
  restrictTo('admin', 'lead-guide', 'guide'),
  getMonthlyPlan
);

router.get('/tours-within/:distance/center/:latlng/unit/:unit', getToursWithin);
// /tours-within?distance=233&center=-40,45&unit=mi
// /tours-within/233/center/-40,45/unit/mi

router.get('/distances/:latlng/unit/:unit', getDistances);

router.get('/', getAllTours);
router.post('/', protect, restrictTo('admin', 'lead-guide'), createTour);

router.get('/:id', getTour);
router.patch('/:id', protect, restrictTo('admin', 'lead-guide'), updateTour);
router.delete('/:id', protect, restrictTo('admin', 'lead-guide'), deleteTour);

module.exports = router;
