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
  
  resetPasswordToken: { type: String },
  resetPasswordExpire: { type: Date },
  
  createdAt: { type: Date, default: Date.now }
});

// Hash password before saving
UserSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare password
UserSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
