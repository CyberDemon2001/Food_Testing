// adminMiddleware.js
const User = require('../models/User');

const adminMiddleware = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);  // Assuming userId is set in authMiddleware
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();  // Proceed to the next middleware/route handler
  } catch (err) {
    res.status(500).json({ message: 'Error checking admin privileges' });
  }
};

module.exports = adminMiddleware;
