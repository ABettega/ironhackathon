const express = require('express');
const router  = express.Router();
const qr = require('qr-image')
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

router.get('/coupon/:coupon', (req, res, next) => {
  let { coupon } = req.params;
  const url = `${process.env.CONFIRMATION_LINK}${coupon}`; 
  const code = qr.image(url, { type: 'png', ec_level: 'H', size: 5, margin: 0 });
  res.setHeader('Content-type', 'image/png');
  code.pipe(res)
});

router.get('/:coupon', (req, res, next) => {
  let { coupon } = req.params;
  const url = `${process.env.CONFIRMATION_LINK}coupon/${coupon}`; 
  User.findOneAndUpdate({generatedCoupon: {$eq: coupon }}, {$set: {redeemed: true}})
  .then(user => {
    if (user.redeemed) {
      res.render('coupon', { user, url })
    } else {
      res.render('activate', { user, url })
    }
  })
  .catch(err => console.log(err))
});

module.exports = router;
