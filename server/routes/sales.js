const express = require('express');
const router = express.Router();
const Sale = require('../models/Sale');

// GET all sales
router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 });
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sales' });
  }
});

// POST new sale
router.post('/', async (req, res) => {
  try {
    const sale = await Sale.create(req.body);
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: 'Failed to create sale' });
  }
});

// DELETE sale
router.delete('/:id', async (req, res) => {
  try {
    const sale = await Sale.findByIdAndDelete(req.params.id);
    if (!sale) {
      return res.status(404).json({ error: 'Sale not found' });
    }
    res.json({ message: 'Sale deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sale' });
  }
});

// DELETE all sales (for data clearing)
router.delete('/', async (req, res) => {
  try {
    await Sale.deleteMany({});
    res.json({ message: 'All sales deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all sales' });
  }
});

module.exports = router;
