const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const uniqueSchema = new Schema({
  month: Number,
  uniqueVisitors: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Unique = mongoose.model('Unique', uniqueSchema);
module.exports = Unique;

