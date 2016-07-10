let express = require('express');
let session = require('express-session');
let mysql = require('mysql');
let MySQLStore = require('express-mysql-session')(session);
let glob = require('glob');

let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let compress = require('compression');
let methodOverride = require('method-override');



module.exports = function(app, config) {
  let env = process.env.NODE_ENV || 'development';
  let utils = require(config.root + '/app/utils/utils');
  app.locals.ENV = env;
  app.locals.ENV_DEVELOPMENT = env == 'development';


  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  app.use(favicon(config.root + '/public/favicon.ico'));
  let connection = mysql.createConnection(config.db);
  let sessionStore = new MySQLStore({}, connection);
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
  }));
  // logger.token('username', (req, res)=>{
  //   console.log(req.session.user.username);
  //   req.session.user ? req.session.user.username : '-';
  // });
  // logger.token('userId', (req, res)=>{
  //   req.session.user ? req.session.user.id : '-';
  // });
  // app.use(logger(':date[web] :userId :username :method :url :response-time'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(compress());
  app.use(express.static(config.root + '/public'));
  app.use(methodOverride());

  app.get('/', (req, res)=>{
    // res.sendFile(path.join(__dirname,
    // '../app_angular/index.html'))
    res.redirect('/index.html');
  });

  let controllers = glob.sync(config.root + '/app/controllers/*.js');
  controllers.forEach(function (controller) {
    require(controller)(app);
  });

  app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      utils.handleError(res, err, '服务器出错');
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    utils.handleError(res, err, '服务器出错');
  });

};
