const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema({
  artisan: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const { saveBackup } = require('../utils/persistence');
ReviewSchema.post('save', async function() {
  await saveBackup();
});

module.exports = mongoose.model('Review', ReviewSchema);
