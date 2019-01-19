var express = require('express');
const passport = require('passport');
let User = require('../models/user');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post("/", (req, res) => {
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


module.exports = router;
