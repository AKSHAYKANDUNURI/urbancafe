const router = require('express').Router()
const Product = require('../models/Product')

router.get('/', async (_req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: 1 })
    res.json(products)
  } catch (e) {
    res.status(500).json({ error: e.message })
  }
})

router.post('/', async (req, res) => {
  try {
    const name = String(req.body?.name || '').trim()
    const price = Number(req.body?.price)
    const available = req.body?.available !== false
    const category = String(req.body?.category || '').trim()

    if (!name) return res.status(400).json({ error: 'Name is required' })
    if (!Number.isFinite(price)) return res.status(400).json({ error: 'Price is required' })

    const product = await Product.create({ name, category, price, available })
    res.status(201).json(product)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const update = {}
    if (req.body.name !== undefined) update.name = String(req.body.name).trim()
    if (req.body.category !== undefined) update.category = String(req.body.category).trim()
    if (req.body.price !== undefined) update.price = Number(req.body.price)
    if (req.body.available !== undefined) update.available = req.body.available

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    )
    if (!product) return res.status(404).json({ error: 'Not found' })
    res.json(product)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/', async (_req, res) => {
  try {
    await Product.deleteMany({})
    res.json({ success: true })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

module.exports = router
