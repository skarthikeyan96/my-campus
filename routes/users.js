const express = require('express');
const passport = require('passport');
//const jwt = require("jwt-simple")
const jwt = require("jsonwebtoken")
const User = require('../models/user');
const router = express.Router();
/* GET users listing. */
router.get('/register', function (req, res, next) {
  res.render('signup.ejs', {
    title: 'My Campus | Signup'
  });
});

router.get('/login', (req, res) => {
  res.render('login.ejs', { title: "My Campus | Login" });
})

router.post("/register", (req, res) => {
  let newUser = new User({ username: req.body.username, FullName: req.body.Fullname, email: req.body.email, isStudent: req.body.isStudent, isAdmin: req.body.isAdmin })
  User.register(newUser, req.body.password, (err, user) => {
    if (err) {
      console.log(err)
      console.log(err.message)
      return res.status(422).json({ message: "failure", error: err.message }) //422 Unprocessable Entity
    }
    passport.authenticate('local')(req, res, () => {
      //req.flash("success",`Welcome to the application ${user.firstname}`)
      //res.redirect("/Learning")
      res.status(200).json({ message: "success" })
    })
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    if (!user)
      return res.status(401).json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: `${info.message}` });
    req.logIn(user, function (err) {
      if (err)
        return next(err);
      //("success",`Successfully logged in to the application ${user.firstname}`)
      console.log(req.user)
      //const token = jwt.encode({ username: req.user.username}, process.env.JWT_SECRET);
      const token = jwt.sign({ username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!", TOKEN: token });
    });
  })(req, res, next);
});



module.exports = router;
