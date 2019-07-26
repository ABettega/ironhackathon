const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/admin/dashboard",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const name = req.body.name;
  const email = req.body.email;
  if (email === "" || email === "") {
    res.render("auth/signup", { message: "Indicate name and email" });
    return;
  }

  User.findOne({ email }, "email", (err, user) => {
    if (user !== null) {
      res.render("auth/signup", { message: "The email already exists" });
      return;
    }

    let generatedCoupon = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i += 1) {
       generatedCoupon += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    const newUser = new User({
      name,
      password: '',
      email,
      generatedCoupon,
      redeemed: false
    });

    let transport = nodemailer.createTransport({
      host: process.env.MAILTRAP_SERVER,
      port: process.env.MAILTRAP_PORT,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
      }
    });

    newUser.save()
    .then(() => {
      transport.sendMail({
        from: '"Equipe Coconutz!" <coconutz@superfoodsinc.com>',
        to: email, 
        subject: 'Tá aqui o cupom!',
        text: `Acesse o link ${process.env.CONFIRMATION_LINK}${newUser.generatedCoupon} para confirmar sua conta!`,
        html: `Acesse o link <b>${process.env.CONFIRMATION_LINK}${newUser.generatedCoupon}</b> para confirmar sua conta!`
      })
      res.redirect("/");
    })
    .catch(err => {
      res.render("auth/signup", { message: "Something went wrong" });
    })
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

module.exports = router;
