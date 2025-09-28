const Facility = require('../models/Facility');

const getFacilities = async (req, res) => {
  try {
    const { page = 1, limit = 10, isActive } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const facilities = await Facility.find(query)
      .sort({ name: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Facility.countDocuments(query);

    res.json({
      facilities,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalFacilities: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getFacilityById = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createFacility = async (req, res) => {
  try {
    const { name, image, description, openingHours } = req.body;
    
    const facility = new Facility({
      name,
      image,
      description,
      openingHours,
    });
    
    await facility.save();
    res.status(201).json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateFacility = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'image', 'description', 'openingHours', 'isActive'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    updates.forEach(update => facility[update] = req.body[update]);
    await facility.save();
    
    res.json(facility);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteFacility = async (req, res) => {
  try {
    const facility = await Facility.findById(req.params.id);
    
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }
    
    await facility.remove();
    res.json({ message: 'Facility deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getFacilities,
  getFacilityById,
  createFacility,
  updateFacility,
  deleteFacility,
};