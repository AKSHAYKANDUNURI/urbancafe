const mongoose = require('mongoose')

const categorySchema = new mongoose.Schema(
  { name: { type: String, required: true, trim: true } },
  { timestamps: true, collection: 'category' }
)

categorySchema.set('toJSON', {
  virtuals: true,
  transform: (_doc, ret) => {
    ret.id = ret._id.toString()
    delete ret._id
    delete ret.__v
  }
})

module.exports = mongoose.model('Category', categorySchema)
