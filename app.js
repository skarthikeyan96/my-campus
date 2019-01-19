var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv').config()
// setting up the models
let User = require('./models/user');
const JWT_SECRET="secret";
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
// setting up the passport
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser=require('body-parser');
const jwt = require("jwt-simple")
//setting up mongoose
mongoose.connect('mongodb://vipin:vpn123@ds056419.mlab.com:56419/mshack', { useNewUrlParser: true }) // test -- db
//setting up passport 
app.use(require('express-session')({
  secret: 'SECRET',
  resave: false,
  saveUninitialized: false
}))
//init the passport 
app.use(passport.initialize());
// session
app.use(passport.session());
// use the Local Strategy 
passport.use(new Strategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/register', usersRouter);

app.post('/login',function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      if (err) return res.status(500).json({message:"INTERNAL SERVER ERROR"});
      if (!user)
          return res.status(401).json({ SERVER_RESPONSE: 0, SERVER_MESSAGE: `${info.message}` });
      req.logIn(user, function(err) {
          if (err)
              return next(err);
              //("success",`Successfully logged in to the application ${user.firstname}`)
              console.log(req.user)
              const token = jwt.encode({ username: req.user.username}, JWT_SECRET);
          return res.status(200).json({ SERVER_RESPONSE: 1, SERVER_MESSAGE: "Logged in!",TOKEN:token});
      });
  })(req, res, next);
});



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
