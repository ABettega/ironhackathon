const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const nodemailer = require('nodemailer');

router.get("/login", (req, res, next) => {
  res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
  successRedirect: "/admin/",
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  let nameArr = req.body.name.split(' ');
  const name = nameArr.shift();
  const lastName = nameArr.join(' ');
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
      lastName,
      password: '',
      email,
      generatedCoupon,
      redeemed: false
    });

    // let transport = nodemailer.createTransport({
    //   host: process.env.SMTP_SERVER,
    //   port: process.env.SMTP_PORT,
    //   auth: {
    //     type: 'AUTH PLAIN',
    //     user: process.env.SMTP_USER,
    //     pass: process.env.SMTP_PASS
    //   }
    // });

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
        from: '"Equipe Coconutz!" <coconutz@ironhackers.dev>',
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
