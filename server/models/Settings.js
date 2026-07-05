const mongoose = require('mongoose')

const settingsSchema = new mongoose.Schema(
  {
    cafeName: { type: String, default: 'Urban Cafe', trim: true },
    currency: { type: String, default: '₹', trim: true },
  },
  { timestamps: true, collection: 'setting' }
)

settingsSchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Settings', settingsSchema)
