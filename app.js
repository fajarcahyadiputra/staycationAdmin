var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');

//import database
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://fajarcahyadiputra:12Temansejati@cluster0.frea1.mongodb.net/db_staycation?retryWrites=true&w=majority',{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: true
});




var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
//untuk mengimport route admin
const adminRouter = require('./routes/admin');
//impor router api
const apiRouter = require('./routes/api');
const { static } = require('express');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//for make a session
app.use(session({
  secret : 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 60000}
}));

//for make flash message
app.use(flash());

app.use(methodOverride('_method'))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//untuk meload data asset dari sb admin 2
app.use('/sb-admin-2', express.static(path.join(__dirname, 'node_modules/startbootstrap-sb-admin-2')))
//for use router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/admin', adminRouter);
app.use('/api/v1/member', apiRouter);
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
