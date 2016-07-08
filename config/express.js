var express = require('express');
var session = require('express-session');
var mysql = require('mysql');
var MySQLStore = require('express-mysql-session')(session);
var glob = require('glob');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');



module.exports = function(app, config) {
  var env = process.env.NODE_ENV || 'development';
  var utils = require(config.root + '/app/utils/utils')
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';


  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(favicon(config.root + '/public/img/favicon.ico'));
  var connection = mysql.createConnection(config.db);
  var sessionStore = new MySQLStore({}, connection);
  app.use(cookieParser());
  app.use(session({
    name: 'sid',
    store: sessionStore,
    saveUninitialized: true,
    resave: false,
    secret: 'bangbangbang',
    cookie: {
      path: '/',
      httpOnly: false,
      secure: false,
      maxAge: 3 * 60 * 60 * 1000
    }
  }))
  logger.token('username', (req, res)=>{
     req.session.user ? req.session.user.username : '-'
  })
  logger.token('userId', (req, res)=>{
     req.session.user ? req.session.user.methodOverride : '-'
  })
  app.use(logger(':date[web] :userId :username :method :url :response-time'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.get('/', (req, res)=>{
    res.send('hello world')
  })

  var controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
  
  if(app.get('env') === 'development'){
    app.use(function (err, req, res, next) {
      res.status(err.status || 500);
      utils.handleError(res, err, '服务器出错')
    });
  }

  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    utils.handleError(res, err, '服务器出错')
  });

};
