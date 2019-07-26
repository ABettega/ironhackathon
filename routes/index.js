const express = require('express');
const router  = express.Router();
const User = require('../models/User');
const Stores = require('../models/Stores');

/* GET home page */
router.get('/', (req, res, next) => {
  const {GOOGLE_API_KEY} = process.env;
  res.render('index', {GOOGLE_API_KEY});
});

router.get('/places', (req, res, next) => {
  Stores.find()
    .then(stores => {
      res.status(200).json({ stores });
    })
    .catch(error => console.log(error))
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
