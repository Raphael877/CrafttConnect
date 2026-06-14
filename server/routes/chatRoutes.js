const express = require('express');
const router = express.Router();
const { getMessages, sendMessage, getConversations } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware');

router.get('/conversations', protect, getConversations);
router.get('/:chatId', protect, getMessages);
router.post('/', protect, sendMessage);

module.exports = router;
