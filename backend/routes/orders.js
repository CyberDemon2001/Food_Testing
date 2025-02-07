const express = require('express');
const Order = require('../models/Order');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);

// Place an order
router.post('/', async (req, res) => {
  const { studentId, restaurantId, items, total } = req.body;
  try {
    const order = new Order({ studentId, restaurantId, items, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all orders (Admin only)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().populate('studentId restaurantId');
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update order status (Admin only)
router.put('/:id', async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;