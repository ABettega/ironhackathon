const express = require("express");
const router = express.Router();
const ensureLogin = require('connect-ensure-login');
const User = require("../models/User");
const Unique = require('../models/Unique');

router.get("/dashboard", (req, res, next) => {
  res.render("admin/dashboard");
});

router.get("/getLeads", (req,res,next) =>{
  User.find()
  .then((users) => {
    Unique.find()
    .then(uniques => {
      const response = {
        users,
        uniques
      }
      res.status(200).json({ response });
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router;