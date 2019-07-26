const express = require('express');
const router  = express.Router();
const User = require('../models/User');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/:coupon', (req, res, next) => {
  let { coupon } = req.params;
  User.findOneAndUpdate({generatedCoupon: {$eq: coupon }}, {$set: {redeemed: true}})
  .then(user => {
    if (user.redeemed) {
      res.render('coupon', { user })
    } else {
      res.render('activate', { user })
    }
  })
  .catch(err => console.log(err))
});

module.exports = router;
