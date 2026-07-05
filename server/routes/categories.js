const router = require('express').Router()
const Category = require('../models/Category')

router.get('/', async (_req, res) => {
  try {
    const cats = await Category.find().sort({ createdAt: 1 })
    res.json(cats)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const cat = await Category.create({ name: req.body.name })
    res.status(201).json(cat)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const cat = await Category.findByIdAndUpdate(
      req.params.id,
      { name: req.body.name },
      { new: true, runValidators: true }
    )
    if (!cat) return res.status(404).json({ error: 'Not found' })
    res.json(cat)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/', async (_req, res) => {
  try {
    await Category.deleteMany({})
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = router
