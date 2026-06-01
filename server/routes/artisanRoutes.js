const express = require('express');
const router = express.Router();
const { updateProfile, addPortfolioItem, getAllArtisans, getArtisanById } = require('../controllers/artisanController');
const { protect } = require('../middleware/authMiddleware');

router.get('/', getAllArtisans);
router.get('/:id', getArtisanById);
router.put('/profile', protect, updateProfile);
router.post('/portfolio', protect, addPortfolioItem);

module.exports = router;
