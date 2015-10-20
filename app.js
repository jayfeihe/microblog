var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose');

var app = express();

var flash = require('connect-flash');
var session = require("express-session");

//自定义加载配置模块
var config = require('./common/config');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//-------------------新加内容--------------
//app.use(session({
//  secret:config.cookieSecret,
//  store:new MongoStore({
//    db:config.dbName
//  }),
//  resave:true,
//  saveUninitialized:true
//}));

//获取状态
//app.use(function(req,res,next){
//  console.log("app.usr local");
//  res.locals.user = req.session.user;
//  res.locals.post = req.session.post;
//  var error = req.flash('error');
//  res.locals.error = error.length?error:null;
//
//  var success = req.flash('success');
//  res.locals.success = success.length?success:null;
//
//  next();
//});
//app.use(flash());
//-----------------------------------------


app.use('/', routes);
app.use('/users', users);

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

//连接到mongodb数据库，读取common\config.js中的配置信息
mongoose.connect('mongodb://' + config.dbUser + ':' + config.dbPass + '@' + config.dbAddress + ':' + config.dbPort + '/' +config.dbName);

module.exports = app;
