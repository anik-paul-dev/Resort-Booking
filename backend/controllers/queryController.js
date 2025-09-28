const Query = require('../models/Query');
const { sendQueryResponseEmail } = require('../services/email');

const getQueries = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const query = {};
    
    if (status) {
      query.status = status;
    }

    const queries = await Query.find(query)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Query.countDocuments(query);

    res.json({
      queries,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalQueries: count,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getQueryById = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    
    res.json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createQuery = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    
    const query = new Query({
      name,
      email,
      subject,
      message,
    });
    
    await query.save();
    res.status(201).json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateQueryStatus = async (req, res) => {
  try {
    const { status, response } = req.body;
    const query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    
    query.status = status;
    if (response) {
      query.response = response;
    }
    
    await query.save();
    
    if (status === 'read' && response) {
      await sendQueryResponseEmail(query.email, query.subject, response);
    }
    
    res.json(query);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteQuery = async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    
    if (!query) {
      return res.status(404).json({ message: 'Query not found' });
    }
    
    await query.remove();
    res.json({ message: 'Query deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getQueries,
  getQueryById,
  createQuery,
  updateQueryStatus,
  deleteQuery,
};