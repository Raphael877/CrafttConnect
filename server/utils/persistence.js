const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

const DATA_DIR = path.join(__dirname, '../data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const USERS_PATH = path.join(DATA_DIR, 'users.json');
const MESSAGES_PATH = path.join(DATA_DIR, 'messages.json');
const REVIEWS_PATH = path.join(DATA_DIR, 'reviews.json');

// Guard to prevent saving while loading
let isRestoring = false;

const saveBackup = async () => {
  if (isRestoring) return;
  try {
    const User = mongoose.model('User');
    const Message = mongoose.model('Message');
    const Review = mongoose.model('Review');

    const users = await User.find({});
    const messages = await Message.find({});
    const reviews = await Review.find({});

    fs.writeFileSync(USERS_PATH, JSON.stringify(users, null, 2));
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2));
    fs.writeFileSync(REVIEWS_PATH, JSON.stringify(reviews, null, 2));
    console.log('Database backup saved successfully.');
  } catch (error) {
    console.error('Error saving database backup:', error);
  }
};

const loadBackup = async () => {
  isRestoring = true;
  try {
    const User = mongoose.model('User');
    const Message = mongoose.model('Message');
    const Review = mongoose.model('Review');

    const userCount = await User.countDocuments({});
    if (userCount === 0 && fs.existsSync(USERS_PATH)) {
      const usersData = JSON.parse(fs.readFileSync(USERS_PATH, 'utf8'));
      if (usersData && usersData.length > 0) {
        await User.collection.insertMany(usersData);
        console.log(`Restored ${usersData.length} users from backup.`);
      }
    }

    const messageCount = await Message.countDocuments({});
    if (messageCount === 0 && fs.existsSync(MESSAGES_PATH)) {
      const messagesData = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
      if (messagesData && messagesData.length > 0) {
        await Message.collection.insertMany(messagesData);
        console.log(`Restored ${messagesData.length} messages from backup.`);
      }
    }

    const reviewCount = await Review.countDocuments({});
    if (reviewCount === 0 && fs.existsSync(REVIEWS_PATH)) {
      const reviewsData = JSON.parse(fs.readFileSync(REVIEWS_PATH, 'utf8'));
      if (reviewsData && reviewsData.length > 0) {
        await Review.collection.insertMany(reviewsData);
        console.log(`Restored ${reviewsData.length} reviews from backup.`);
      }
    }
  } catch (error) {
    console.error('Error loading database backup:', error);
  } finally {
    isRestoring = false;
  }
};

module.exports = {
  saveBackup,
  loadBackup
};
