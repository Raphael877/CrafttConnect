const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword, updateUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);
router.put('/profile', protect, updateUserProfile);

module.exports = router;
