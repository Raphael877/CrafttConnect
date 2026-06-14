const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  chatId: { type: String, required: true } // Combination of artisan and customer IDs
});

const { saveBackup } = require('../utils/persistence');
MessageSchema.post('save', async function() {
  await saveBackup();
});

module.exports = mongoose.model('Message', MessageSchema);
