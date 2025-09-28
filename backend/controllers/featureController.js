const Feature = require('../models/Feature');

const getFeatures = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const features = await Feature.find(query)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Feature.countDocuments(query);

    res.json({
      features,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalFeatures: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFeatureById = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    res.json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFeature = async (req, res) => {
  try {
    const { name, icon, description } = req.body;
    
    const feature = new Feature({
      name,
      icon,
      description,
    });
    
    await feature.save();
    res.status(201).json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFeature = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'icon', 'description', 'isActive'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    updates.forEach(update => feature[update] = req.body[update]);
    await feature.save();
    
    res.json(feature);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFeature = async (req, res) => {
  try {
    const feature = await Feature.findById(req.params.id);
    
    if (!feature) {
      return res.status(404).json({ message: 'Feature not found' });
    }
    
    await feature.remove();
    res.json({ message: 'Feature deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFeatures,
  getFeatureById,
  createFeature,
  updateFeature,
  deleteFeature,
};