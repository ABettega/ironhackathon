const express = require("express");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');

router.get("/dashboard",(req, res, next) => {
  res.render("admin/LeadsxCupons");
});

module.exports = router;