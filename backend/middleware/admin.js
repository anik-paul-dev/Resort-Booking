const auth = require('./auth');

const admin = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin resource.' });
    }
    next();
  });
};

module.exports = admin;