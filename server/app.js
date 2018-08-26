var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
require('dotenv').config()

var app = express();
var cors = require('cors')

app.use(cors())
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if(!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development'
}

const DB_URL = {
  development: process.env.DB_dev,
  test: process.env.DB_test
}
console.log(process.env.NODE_ENV); // test expected

mongoose.connect(DB_URL[process.env.NODE_ENV], { useNewUrlParser: true })
.then((result) => {
  console.log('Success connect Mlab');
    
})
.catch((err) => {
  console.log(err);
});

const db = mongoose.connection

db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
  console.log("Connected dabatase success")
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

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
