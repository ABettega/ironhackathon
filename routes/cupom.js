const express = require('express');
const router  = express.Router();

router.get('/', (req, res, next) => {
  res.render('cupom/qrcode')
});

router.get('/qrcode', (req, res, next) => {
});

module.exports = router;