const router = require('express').Router()
const Settings = require('../models/Settings')

router.get('/', async (_req, res) => {
  try {
    const settings = await Settings.findOne() || { cafeName: 'Urban Cafe', currency: '₹' }
    res.json(settings)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.put('/', async (req, res) => {
  try {
    const settings = await Settings.findOneAndUpdate(
      {},
      { cafeName: req.body.cafeName, currency: req.body.currency },
      { new: true, upsert: true, runValidators: true }
    )
    res.json(settings)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = router
