const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// Helper to convert base64 to Buffer
const base64ToBuffer = (base64String) => {
  if (!base64String) return null;
  const base64Data = base64String.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
};

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ name: 1 });
    // Convert Buffer to base64 for JSON serialization
    const productsWithBase64 = products.map(product => {
      const productObj = product.toObject();
      if (productObj.image && productObj.image.data) {
        productObj.image.data = productObj.image.data.toString('base64');
      }
      return productObj;
    });
    res.json(productsWithBase64);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// POST new product with binary image data
router.post('/', async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Convert base64 image to Buffer
    if (req.body.image && req.body.image.data) {
      productData.image = {
        data: base64ToBuffer(req.body.image.data),
        contentType: req.body.image.contentType
      };
    } else {
      delete productData.image;
    }
    
    const product = await Product.create(productData);
    
    // Convert Buffer to base64 for response
    const productObj = product.toObject();
    if (productObj.image && productObj.image.data) {
      productObj.image.data = productObj.image.data.toString('base64');
    }
    res.status(201).json(productObj);
  } catch (error) {
  console.error("========== PRODUCT CREATE ERROR ==========");
  console.error(error);
  console.error(error.message);

  res.status(400).json({
    error: error.message,
    validation: error.errors || null
  });
}
});

// PUT update product with binary image data
router.put('/:id', async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Convert base64 image to Buffer
    if (req.body.image && req.body.image.data) {
      productData.image = {
        data: base64ToBuffer(req.body.image.data),
        contentType: req.body.image.contentType
      };
    } else if (req.body.image === null) {
      productData.image = null;
    }
    
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productData,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    // Convert Buffer to base64 for response
    const productObj = product.toObject();
    if (productObj.image && productObj.image.data) {
      productObj.image.data = productObj.image.data.toString('base64');
    }
    res.json(productObj);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(400).json({ error: 'Failed to update product' });
  }
});

// DELETE product
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// DELETE all products (for data clearing)
router.delete('/', async (req, res) => {
  try {
    await Product.deleteMany({});
    res.json({ message: 'All products deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete all products' });
  }
});

module.exports = router;
