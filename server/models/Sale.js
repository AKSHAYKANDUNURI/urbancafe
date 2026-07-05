const mongoose = require('mongoose')

const saleItemSchema = new mongoose.Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
)

const saleSchema = new mongoose.Schema(
  {
    date: { type: Date, default: Date.now },
    items: { type: [saleItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
  },
  { timestamps: true, collection: 'sale' }
)

saleSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    ret.date = ret.date instanceof Date ? ret.date.toISOString() : ret.date
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Sale', saleSchema)
