const Carousel = require('../models/Carousel');

const getCarousels = async (req, res) => {
  try {
    const { isActive } = req.query;
    const query = {};
    
    if (isActive !== undefined) {
      query.isActive = isActive === 'true';
    }

    const carousels = await Carousel.find(query)
      .sort({ order: 1, createdAt: -1 });

    res.json(carousels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getCarouselById = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCarousel = async (req, res) => {
  try {
    const { title, image, description, buttonText, buttonLink, order } = req.body;
    
    const carousel = new Carousel({
      title,
      image,
      description,
      buttonText,
      buttonLink,
      order,
    });
    
    await carousel.save();
    res.status(201).json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateCarousel = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'image', 'description', 'buttonText', 'buttonLink', 'isActive', 'order'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));
    
    if (!isValidOperation) {
      return res.status(400).json({ message: 'Invalid updates' });
    }
    
    const carousel = await Carousel.findById(req.params.id);
    
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    
    updates.forEach(update => carousel[update] = req.body[update]);
    await carousel.save();
    
    res.json(carousel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCarousel = async (req, res) => {
  try {
    const carousel = await Carousel.findById(req.params.id);
    
    if (!carousel) {
      return res.status(404).json({ message: 'Carousel not found' });
    }
    
    await carousel.remove();
    res.json({ message: 'Carousel deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getCarousels,
  getCarouselById,
  createCarousel,
  updateCarousel,
  deleteCarousel,
};