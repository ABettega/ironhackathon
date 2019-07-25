const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const couponSchema = new Schema({
  generatedCoupon: {type: String, unique: true},
  password: String,
  redeemed: Boolean,
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

const Coupon = mongoose.model('Coupon', couponSchema);
module.exports = Coupon;
