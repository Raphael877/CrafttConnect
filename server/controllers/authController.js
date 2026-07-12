const User = require('../models/User');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { getCoordinates } = require('../utils/geocoder');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'secret_key', { expiresIn: '30d' });
};

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phoneNumber: user.phoneNumber || '',
      profilePicture: user.profilePicture || '',
      artisanProfile: user.artisanProfile || {},
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber || '',
        profilePicture: user.profilePicture || '',
        artisanProfile: user.artisanProfile || {},
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found with this email' });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field
    user.resetPasswordToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

    // Set expire (10 minutes)
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Create reset url (client side)
    const referer = req.header('Referer');
    const origin = referer ? new URL(referer).origin : 'http://localhost:5173';
    const resetUrl = `${origin}/reset-password/${resetToken}`;

    console.log(`Password reset URL for ${email}: ${resetUrl}`);

    res.status(200).json({
      message: 'Email sent successfully',
      resetToken,
      resetUrl
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const resetPasswordToken = crypto
      .createHash('sha256')
      .update(req.params.token)
      .digest('hex');

    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Set new password
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.phoneNumber !== undefined) user.phoneNumber = req.body.phoneNumber;
      if (req.body.profilePicture !== undefined) user.profilePicture = req.body.profilePicture;

      if (req.body.password) {
        user.password = req.body.password;
      }

      // If user is artisan, also update artisanProfile fields if provided
      if (user.role === 'artisan') {
        const { businessName, skills, bio, location, availability, portfolio } = req.body;
        if (!user.artisanProfile) {
          user.artisanProfile = {
            businessName: '',
            skills: [],
            bio: '',
            location: { state: '', city: '', coordinates: { lat: 6.5244, lng: 3.3792 } },
            portfolio: [],
            rating: 0,
            numberOfReviews: 0,
            availability: true
          };
        }

        if (businessName !== undefined) user.artisanProfile.businessName = businessName;
        if (skills !== undefined) user.artisanProfile.skills = skills;
        if (bio !== undefined) user.artisanProfile.bio = bio;
        if (portfolio !== undefined) user.artisanProfile.portfolio = portfolio;
        
        if (location) {
          if (!user.artisanProfile.location) {
            user.artisanProfile.location = { state: '', city: '', coordinates: { lat: 6.5244, lng: 3.3792 } };
          }
          
          const stateChanged = location.state !== undefined && location.state !== user.artisanProfile.location.state;
          const cityChanged = location.city !== undefined && location.city !== user.artisanProfile.location.city;
          
          if (location.state !== undefined) user.artisanProfile.location.state = location.state;
          if (location.city !== undefined) user.artisanProfile.location.city = location.city;
          
          if (stateChanged || cityChanged) {
            // Geocode and update coordinates
            const coords = await getCoordinates(user.artisanProfile.location.city, user.artisanProfile.location.state);
            if (coords) {
              user.artisanProfile.location.coordinates = coords;
            }
          } else if (location.coordinates) {
            user.artisanProfile.location.coordinates = location.coordinates;
          }
        }
        if (availability !== undefined) user.artisanProfile.availability = availability;
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        phoneNumber: updatedUser.phoneNumber,
        profilePicture: updatedUser.profilePicture,
        artisanProfile: updatedUser.artisanProfile,
        token: generateToken(updatedUser._id)
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber || '',
        profilePicture: user.profilePicture || '',
        artisanProfile: user.artisanProfile || {}
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
