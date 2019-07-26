const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const storeSchema = new Schema({
  street: String,
  number: Number,
  cep: Number,
  neighborhood: String,
  city: String,
  state: String,
  latitude: Number,
  longitude: Number
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Store= mongoose.model('Store', storeSchema);
module.exports = Store;
