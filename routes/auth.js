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

    let transport = nodemailer.createTransport({
      host: process.env.SMTP_SERVER,
      port: process.env.SMTP_PORT,
      auth: {
        type: 'AUTH PLAIN',
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
      }
    });

    // let transport = nodemailer.createTransport({
    //   host: process.env.MAILTRAP_SERVER,
    //   port: process.env.MAILTRAP_PORT,
    //   auth: {
    //     user: process.env.MAILTRAP_USER,
    //     pass: process.env.MAILTRAP_PASS
    //   }
    // });

    newUser.save()
    .then(() => {
      transport.sendMail({
        from: '"Team Coconutz!" <coconutz@gin.ink>',
        to: email, 
        subject: `Here's the coupon you requested!`,
        text: `Click on ${process.env.CONFIRMATION_LINK}${newUser.generatedCoupon} to redeem your coupon!`,
        html: `
        <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <table style="font-family: arial, helvetica, sans-serif; padding: 100px; width: 100%; height:100vh; background:linear-gradient(180deg, rgba(200,199,50,1) 0%, rgba(159,226,232,1) 100%);; margin:0;">

        <tr>
            <td>
        
                <table align="center" class="lw-container" style="background-color: #fff; border-radius: 22px; border-collapse: collapse; margin: 0 auto; width: 630px;">
                    <tr>
                        <td style="text-align: center; width: 630px; padding: 10px; margin-top: 20px;">
                                <img src="${process.env.CONFIRMATION_LINK}images/logo.svg" alt="logo" style="border: none; text-decoration: none; margin-top: 20px; height: 30px">
                                <table cellpadding="30">
                    <tr>
                <td style="margin: 0 50px;">
        
                    <h3 style="text-align: center"><strong>Congrats ${newUser.name}</strong></h3>
        
                    <p style="font-family: arial, helvetica, sans-serif; font-size: 20px; text-align: center;">
                        We are very happy that you chose Coconutz. Get to know one of our points of sale
                        and get these discounts on all our Coconutz products!</p>
        
                    <p style="font-family: arial, helvetica, sans-serif; font-size: 13px; text-align: center;">
                        This discount is non-transferable and will only apply to you. Enjoy!
                    </p>
        
                    <br>
                        <center style="font-family: arial, helvetica, sans-serif; font-size: 20px; text-align: center;">
                            <a style="font-family: arial, helvetica, sans-serif; font-size: 20px; text-align: center; text-decoration: none; color: aqua;" href="${process.env.CONFIRMATION_LINK}${newUser.generatedCoupon}">
                                <img style="padding: 10px; height: 20px;" alt="Redeem my coupom" src="${process.env.CONFIRMATION_LINK}images/symbol.png">
                                <p>REDEEM MY COUPOM</p>
                            </a>
                        </center>   
        
                    </td>
                </tr>
            </table>
            <p style="font-family: arial, helvetica, sans-serif; font-size: 10px;">Superfoods,Inc and Coconutz are trademarks.<br>You can stop receive this messages <strong>clicking here.</strong></strong></p>
</body>
</html>`
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
