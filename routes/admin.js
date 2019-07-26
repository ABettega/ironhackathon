const express = require("express");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');


router.get("/dashboard", ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  res.render("admin/dashboard");
});

module.exports = router;