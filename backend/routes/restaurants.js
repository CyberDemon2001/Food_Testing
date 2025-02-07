const express = require('express');
const Restaurant = require('../models/Restaurant');
const authMiddleware = require('../middleware/authMiddleware'); 
const adminMiddleware = require('../middleware/adminMiddleware'); 
const router = express.Router();

// Get all restaurants (public route)
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    res.json(restaurant);
  } catch (err) {
    res.status(404).json({ message: 'Restaurant not found' });
  }
});

router.post('/', authMiddleware, adminMiddleware, async (req, res) => {
  const { name, location, menu } = req.body;
  try {
    const restaurant = new Restaurant({ name, location, menu });
    await restaurant.save();
    res.status(201).json(restaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;