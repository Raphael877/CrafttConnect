const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['customer', 'artisan'], default: 'customer' },
  profilePicture: { type: String, default: '' },
  phoneNumber: { type: String, default: '' },
  
  // Artisan specific fields
  artisanProfile: {
    businessName: { type: String, default: '' },
    skills: [{ type: String }],
    bio: { type: String, default: '' },
    location: {
      state: { type: String, default: '' },
      city: { type: String, default: '' },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number }
      }
    },
    portfolio: [{
      imageUrl: { type: String },
      description: { type: String }
    }],
    rating: { type: Number, default: 0 },
    numberOfReviews: { type: Number, default: 0 },
    availability: { type: Boolean, default: true }
  },
  
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
