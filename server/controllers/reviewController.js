const Review = require('../models/Review');
const User = require('../models/User');

// Create review
exports.createReview = async (req, res) => {
  try {
    const { artisanId, rating, comment } = req.body;
    const customerId = req.user._id;

    if (!artisanId || !rating || !comment) {
      return res.status(400).json({ message: 'Artisan, rating, and comment are required' });
    }

    // Check if artisan exists and is an artisan
    const artisan = await User.findById(artisanId);
    if (!artisan || artisan.role !== 'artisan') {
      return res.status(404).json({ message: 'Artisan not found' });
    }

    // Create review
    const review = await Review.create({
      artisan: artisanId,
      customer: customerId,
      rating: Number(rating),
      comment
    });

    // Update artisan's rating and numberOfReviews
    const reviews = await Review.find({ artisan: artisanId });
    const numberOfReviews = reviews.length;
    const avgRating = reviews.reduce((sum, r) => sum + r.rating, 0) / numberOfReviews;

    artisan.artisanProfile.rating = avgRating;
    artisan.artisanProfile.numberOfReviews = numberOfReviews;
    await artisan.save();

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get reviews for an artisan
exports.getArtisanReviews = async (req, res) => {
  try {
    const { artisanId } = req.params;
    const reviews = await Review.find({ artisan: artisanId })
      .populate('customer', 'name profilePicture')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get my reviews (either written by me as customer, or received by me as artisan)
exports.getMyReviews = async (req, res) => {
  try {
    const userId = req.user._id;
    let reviews;
    if (req.user.role === 'artisan') {
      reviews = await Review.find({ artisan: userId })
        .populate('customer', 'name profilePicture')
        .sort({ createdAt: -1 });
    } else {
      reviews = await Review.find({ customer: userId })
        .populate('artisan', 'name artisanProfile.businessName profilePicture')
        .sort({ createdAt: -1 });
    }
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
