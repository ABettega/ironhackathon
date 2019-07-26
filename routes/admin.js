const express = require("express");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const User = require("../models/User");


router.get("/dashboard",(req, res, next) => {
  res.render("admin/LeadsxCupons");
});

router.get("/getLeads", (req,res,next) =>{
  User.find()
  .then((users) => {
    res.status(200).json({ users });
  })
  .catch(err => console.log(err))
})

module.exports = router;