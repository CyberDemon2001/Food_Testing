const express = require('express');
const Order = require('../models/Order');
const authMiddleware = require('../middleware/authMiddleware');
const adminMiddleware = require('../middleware/adminMiddleware');
const router = express.Router();

// Get all orders (Admin only)
router.get('/', authMiddleware, adminMiddleware, async (req, res) => {
  try {
    console.log('Fetching orders...');
    const orders = await Order.find().populate('studentId restaurantId');
    console.log('Orders:', orders);
    res.json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ message: err.message });
  }
});

// Place an order (Student only)
router.post('/', authMiddleware, async (req, res) => {
  const { studentId, restaurantId, items, total } = req.body;
  try {
    const order = new Order({ studentId, restaurantId, items, total });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update order status (Admin only)
router.put('/:id', authMiddleware, adminMiddleware, async (req, res) => {
  const { status } = req.body;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    res.json(order);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;