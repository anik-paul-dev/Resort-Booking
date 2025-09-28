const Review = require('../models/Review');

const getReviews = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, roomId } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }
    
    if (roomId) {
      query.room = roomId;
    }

    const reviews = await Review.find(query)
      .populate('user', 'name profileImage')
      .populate('room', 'name')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Review.countDocuments(query);

    res.json({
      reviews,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalReviews: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewById = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id)
      .populate('user', 'name profileImage')
      .populate('room', 'name');
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateReviewStatus = async (req, res) => {
  try {
    const { status, response } = req.body;
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    review.status = status;
    if (response) {
      review.response = response;
    }
    
    await review.save();
    res.json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }
    
    // Remove review from room
    const Room = require('../models/Room');
    const room = await Room.findById(review.room);
    room.reviews = room.reviews.filter(r => r.toString() !== review._id.toString());
    await room.save();
    
    await review.remove();
    res.json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getReviewStats = async (req, res) => {
  try {
    const { period = 'month' } = req.query;
    let startDate, endDate, groupBy;
    
    const now = new Date();
    
    switch (period) {
      case 'day':
        startDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        endDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'week':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        endDate = new Date(now);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'month':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
        break;
      case 'year':
        startDate = new Date(now.getFullYear(), 0, 1);
        endDate = new Date(now.getFullYear(), 11, 31);
        groupBy = { $dateToString: { format: "%Y-%m", date: "$createdAt" } };
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        groupBy = { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } };
    }
    
    const reviews = await Review.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: groupBy,
          count: { $sum: 1 },
          avgRating: { $avg: "$rating" }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    const totalReviews = await Review.countDocuments({
      createdAt: { $gte: startDate, $lte: endDate }
    });
    
    const avgRating = await Review.aggregate([
      {
        $match: {
          createdAt: { $gte: startDate, $lte: endDate }
        }
      },
      {
        $group: {
          _id: null,
          avg: { $avg: "$rating" }
        }
      }
    ]);
    
    res.json({
      reviews,
      totalReviews,
      avgRating: avgRating[0]?.avg || 0,
      period
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getReviews,
  getReviewById,
  updateReviewStatus,
  deleteReview,
  getReviewStats,
};