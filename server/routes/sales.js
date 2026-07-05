const router = require('express').Router()
const Sale = require('../models/Sale')

router.get('/', async (_req, res) => {
  try {
    const sales = await Sale.find().sort({ date: -1 })
    res.json(sales)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const sale = await Sale.create(req.body)
    res.status(201).json(sale)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Sale.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/', async (_req, res) => {
  try {
    await Sale.deleteMany({})
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = router
