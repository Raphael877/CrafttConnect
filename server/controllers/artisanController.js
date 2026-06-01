const User = require('../models/User');

exports.updateProfile = async (req, res) => {
  try {
    const { businessName, skills, bio, location, availability } = req.body;
    const user = await User.findById(req.user._id);
    if (user && user.role === 'artisan') {
      user.artisanProfile.businessName = businessName || user.artisanProfile.businessName;
      user.artisanProfile.skills = skills || user.artisanProfile.skills;
      user.artisanProfile.bio = bio || user.artisanProfile.bio;
      user.artisanProfile.location = location || user.artisanProfile.location;
      user.artisanProfile.availability = availability !== undefined ? availability : user.artisanProfile.availability;
      
      const updatedUser = await user.save();
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'Artisan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addPortfolioItem = async (req, res) => {
  try {
    const { imageUrl, description } = req.body;
    const user = await User.findById(req.user._id);
    if (user && user.role === 'artisan') {
      user.artisanProfile.portfolio.push({ imageUrl, description });
      await user.save();
      res.status(201).json(user.artisanProfile.portfolio);
    } else {
      res.status(404).json({ message: 'Artisan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllArtisans = async (req, res) => {
  try {
    const { skill, state, city, search } = req.query;
    let query = { role: 'artisan' };

    if (skill) {
      query['artisanProfile.skills'] = { $in: [skill] };
    }
    if (state) {
      query['artisanProfile.location.state'] = state;
    }
    if (city) {
      query['artisanProfile.location.city'] = city;
    }
    if (search) {
      query['$or'] = [
        { name: { $regex: search, $options: 'i' } },
        { 'artisanProfile.businessName': { $regex: search, $options: 'i' } },
        { 'artisanProfile.skills': { $regex: search, $options: 'i' } }
      ];
    }

    const artisans = await User.find(query).select('-password');
    res.json(artisans);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getArtisanById = async (req, res) => {
  try {
    const artisan = await User.findById(req.params.id).select('-password');
    if (artisan && artisan.role === 'artisan') {
      res.json(artisan);
    } else {
      res.status(404).json({ message: 'Artisan not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
