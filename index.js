var path = require('path');
var dotenv = require('dotenv');
var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
const logger = require('morgan');
// setting up the models
let User = require('./models/user');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const PostRouter = require('./routes/post')
var app = express();
// setting up the passport
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const Strategy = require('passport-local').Strategy;
const bodyParser=require('body-parser');

dotenv.config({
  path: __dirname + '/.env'
});

//setting up mongoose
mongoose.connect(`${process.env.MONGO_URL}`, { useNewUrlParser: true }) // test -- db
//setting up passport
app.use(require('express-session')({
  secret: `${process.env.EXPRESS_SECRET}`,
  resave: false,
  saveUninitialized: false
}))
//middleware to get the current user
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    return next();
  });

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
app.use('/user', usersRouter);
app.use('/post',PostRouter) // Routes to post the discusion
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

const PORT = process.env.PORT || 50000;
app.listen(PORT, () => {
  console.log("App is started on post " + PORT);
});

module.exports = app;
