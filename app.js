var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var notes = require('./routes/notes');

var mongoose = require('mongoose');

var app = express();

var session = require("express-session");
var MongoStore = require('connect-mongo')(session);

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

//-------------------新加内容,添加session的支持--------------
app.use(session({
  secret:config.cookieSecret,
  key:config.dbName,
  //cookie:{maxAge:1000*30},
  cookie:{maxAge:1000*60*60*24*30}, //设置session有效期为30天,session会存储到mongodb的sessions集合中，过了有效期会自动删除，可以放到redis等缓存中
  store:new MongoStore({db:config.dbName}),
  resave:true,
  saveUninitialized: true,
  rolling:false
}));

//-----------------------------------------


app.use('/', routes);
app.use('/users', users);
app.use('/note', notes);

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
