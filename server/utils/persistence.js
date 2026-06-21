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
        const usersMapped = usersData.map(u => {
          const doc = { ...u };
          if (doc._id) doc._id = new mongoose.Types.ObjectId(doc._id);
          if (doc.artisanProfile && doc.artisanProfile.portfolio) {
            doc.artisanProfile.portfolio = doc.artisanProfile.portfolio.map(p => ({
              ...p,
              _id: p._id ? new mongoose.Types.ObjectId(p._id) : new mongoose.Types.ObjectId()
            }));
          }
          return doc;
        });
        await User.collection.insertMany(usersMapped);
        console.log(`Restored ${usersData.length} users from backup.`);
      }
    }

    const messageCount = await Message.countDocuments({});
    if (messageCount === 0 && fs.existsSync(MESSAGES_PATH)) {
      const messagesData = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
      if (messagesData && messagesData.length > 0) {
        const messagesMapped = messagesData.map(m => {
          const doc = { ...m };
          if (doc._id) doc._id = new mongoose.Types.ObjectId(doc._id);
          if (doc.sender) doc.sender = new mongoose.Types.ObjectId(doc.sender);
          if (doc.recipient) doc.recipient = new mongoose.Types.ObjectId(doc.recipient);
          return doc;
        });
        await Message.collection.insertMany(messagesMapped);
        console.log(`Restored ${messagesData.length} messages from backup.`);
      }
    }

    const reviewCount = await Review.countDocuments({});
    if (reviewCount === 0 && fs.existsSync(REVIEWS_PATH)) {
      const reviewsData = JSON.parse(fs.readFileSync(REVIEWS_PATH, 'utf8'));
      if (reviewsData && reviewsData.length > 0) {
        const reviewsMapped = reviewsData.map(r => {
          const doc = { ...r };
          if (doc._id) doc._id = new mongoose.Types.ObjectId(doc._id);
          if (doc.artisan) doc.artisan = new mongoose.Types.ObjectId(doc.artisan);
          if (doc.customer) doc.customer = new mongoose.Types.ObjectId(doc.customer);
          return doc;
        });
        await Review.collection.insertMany(reviewsMapped);
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
