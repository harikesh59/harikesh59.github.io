var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var MongoStore = require('connect-mongo')(session);
var config = require('config');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var COOKIE_SECRET = "H7E60JUmYN1RiF1LCssc9BQHE3l45PYw";

if (process.env.NODE_ENV === 'development') {
  mongoose.connect(config.DBUrl);
  console.log("Using database: ", config.DBUrl);
}

app.use(cookieParser());
app.use(session({
  secret: COOKIE_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  })
}));

app.use(express.static(path.join(__dirname, 'public')));


//Set Routes
require('./routes')(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});

if (process.env.FAKE) {
  require('./fixtures')();
}

if (process.env.RESET) {
  const User = require('./models/user');
  const Campaign = require('./models/user');
  const Comment = require('./models/user');

  User.remove({}, (err) => {if(err) return next(err)});
  Campaign.remove({}, (err) => {if(err) return next(err)});
  Comment.remove({}, (err) => {if(err) return next(err)});
}

module.exports = app;
