const express = require('express');
const router = express.Router();
const { createReview, getArtisanReviews, getMyReviews } = require('../controllers/reviewController');
const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createReview);
router.get('/my-reviews', protect, getMyReviews);
router.get('/artisan/:artisanId', getArtisanReviews);

module.exports = router;
