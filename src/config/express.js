'use strict';

var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('errorhandler');
var cors = require('cors');
var logger = require('./logger');
var expressJwt = require('express-jwt');
var helmet = require('helmet');
var passport = require('passport');

var settings = require('./settings');

module.exports = function(app) {
  logger.info('Initiating express.');
  var env = settings.environment;

  // Use helmet to secure Express headers
  var SIX_MONTHS = 1000*60*60*24*31*6;
  app.use(helmet.frameguard());
  app.use(helmet.xssFilter());
  app.use(helmet.noSniff());
  app.use(helmet.ieNoOpen());
  app.use(helmet.hsts({maxAge: SIX_MONTHS, includeSubdomains: true, force: true}));
  app.disable('x-powered-by');


  // Enable body parsing
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(passport.initialize());


  // Authenticate
  app.use(expressJwt({
    secret: settings.jwt.secret,
    strict: true
  })
  .unless({
    path: [
      '/',
      { url: '/account/login', methods: ['POST'] }, // Login an existing account
      { url: '/account/register', methods: ['POST'] }, // Registere a new account
      { url: '/account/activate', methods: ['POST'] },  // Activate a new account using a key
      { url: '/account/activate/resend', methods: ['POST'] },  // Activate a new account using a key
      { url: '/account/forgot-password', methods: ['POST'] },  // Activate a new account using a key
      { url: '/account/change-password', methods: ['POST'] },  // Activate a new account using a key
      { url: '/account/token', methods: ['POST'] },  // Get a new access token using a refresh token
      // { url: '/account/token/reject', methods: ['POST'] }, // Refect an access token by the user
    ]
  })
  );

  // return error message for unauthorized requests
  app.use(function (err, req, res, next) {
    if (err) {
      logger.info('There was an error');
      logger.info(err.name);
    }
    if (err.name === 'UnauthorizedError') {
      return res.status(401).json({
        message: err.message,
        code: err.code,
        status: err.status
      });
    }
  });

  if ('production' === env) {
    //app.use(express.static(path.join(settings.root, 'public')));
    //app.set('appPath', settings.root + '/public');
  }

  if ('development' === env || 'test' === env) {
    //app.use(require('connect-livereload')());
    //app.use(express.static(path.join(config.root, '.tmp')));
    //app.use(express.static(path.join(config.root, 'client')));
    //app.set('appPath', 'client');
    app.use(errorHandler()); // Error handler - has to be last
  }

  logger.info('Express initiated.');
};
