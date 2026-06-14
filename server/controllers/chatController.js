const Message = require('../models/Message');

exports.getMessages = async (req, res) => {
  try {
    const { chatId } = req.params;
    const messages = await Message.find({ chatId }).sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.sendMessage = async (req, res) => {
  try {
    const { recipientId, text, chatId } = req.body;
    const message = await Message.create({
      sender: req.user._id,
      recipient: recipientId,
      text,
      chatId
    });
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const User = require('../models/User');

exports.getConversations = async (req, res) => {
  try {
    const userId = req.user._id;
    const messages = await Message.find({
      $or: [{ sender: userId }, { recipient: userId }]
    }).sort({ timestamp: -1 });

    const conversationPartners = new Set();
    const conversations = [];

    for (const msg of messages) {
      const partnerId = msg.sender.toString() === userId.toString() ? msg.recipient.toString() : msg.sender.toString();
      if (!conversationPartners.has(partnerId)) {
        conversationPartners.add(partnerId);
        const partner = await User.findById(partnerId).select('name email role profilePicture artisanProfile.businessName');
        if (partner) {
          conversations.push({
            partner,
            lastMessage: msg.text,
            timestamp: msg.timestamp,
            chatId: msg.chatId
          });
        }
      }
    }

    res.json(conversations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
