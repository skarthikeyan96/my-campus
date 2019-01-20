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
      return res.status(422).json({ status: "error", msg: err.message }) //422 Unprocessable Entity
    }
    passport.authenticate('local')(req, res, () => {
      //req.flash("success",`Welcome to the application ${user.firstname}`)
      //res.redirect("/Learning")
      const token = jwt.sign({ username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.status(200).json({ status : "success" , message: "successfully registered", data:req.user,token:token })
    })
  })
})

router.post('/login', function (req, res, next) {
  passport.authenticate('local', function (err, user, info) {
    if (err) return res.status(500).json({ status:"error" , message: "INTERNAL SERVER ERROR" });
    if (!user)
      return res.status(401).json({ status: "error", message: `${info.message}` });
    req.logIn(user, function (err) {
      if (err)
        return next(err);
      //("success",`Successfully logged in to the application ${user.firstname}`)
      console.log(req.user)
      //const token = jwt.encode({ username: req.user.username}, process.env.JWT_SECRET);
      const token = jwt.sign({ username: req.user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ status: 1, message: "Logged in!", data:req.user , token: token });
    });
  })(req, res, next);
});

router.get('/logout', (req, res) => {
  req.logout();
  //req.flash("success","You have been logged out")
  res.redirect('/')
});

router.get('/search', (req, res) => {
  let searchQuery = req.query.q;
  User.find({ "username": new RegExp(searchQuery, "ig")})
    .exec((err, users) => {
      if (err) {
        res.status(400).json({status: 'error', message: err.message });
      } else {
        res.status(200).json({
          status: 'success',
          message: 'Search Success',
          users: users
        });
      }
    });
});

module.exports = router;
