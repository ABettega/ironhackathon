const express = require('express');
const router  = express.Router();
const Stores = require('../models/Stores');

router.get('/', (req, res, next) => {
  res.render('map/stores');
});

router.get('/places', (req, res, next) => {
  Stores.find()
    .then(stores => {
      res.status(200).json({ stores });
    })
    .catch(error => console.log(error))
});

module.exports = router;