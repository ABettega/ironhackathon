const express = require('express');
const router  = express.Router();
const qr = require('qr-image')

router.get('/', (req, res, next) => {
  res.render('cupom/qrcode')
});

router.get('/qrcode', (req, res, next) => {
  const url ='https://google.com.br' 
  const code = qr.image(url, {type: 'svg'})
  res.type('svg');
  code.pipe(res)
});

module.exports = router;