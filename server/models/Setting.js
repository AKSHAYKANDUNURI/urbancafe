const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  cafeName: {
    type: String,
    default: 'Urban Cafe'
  },
  currency: {
    type: String,
    default: '₹'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Setting', settingSchema, 'settings');
