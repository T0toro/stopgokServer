'use strict';

/**
* Module variables
*/

let express, session, compression, morgan, config, cookieParser, cookieSession, bodyParser, methodOverride, csrf, mongoStore, flash, winston, helpers, pkg, env, log;

/**
* Module dependencies.
*/

express = require('express');

session = require('express-session');
compression = require('compression');

morgan = require('morgan');
winston = require('winston');

cookieParser = require('cookie-parser');
bodyParser = require('body-parser');
cookieSession = require('cookie-session');

methodOverride = require('method-override');
csrf = require('csurf');

mongoStore = require('connect-mongo')(session);
flash = require('connect-flash');
helpers = require('view-helpers');

config = require('./index');
pkg = require('../package.json');

env = process.env.NODE_ENV || 'development';

/**
* Expose
*/

module.exports = function(app, passport) {

  // Compression middleware
  // (should be placed before express.static)
  // --------------------------------------------

  app.use(compression({
    threshold: 512
  }));

  // Static files middleware
  // --------------------------------------------

  app.use(express.static(config.root + '/public'));

  // Use winston on production
  // --------------------------------------------

  if (env !== 'development') {
    log = {
      stream: {
        write: function(message, encoding) {
          winston.info(message);
        }
      }
    };
  } else {
    log = 'dev';
  }

  // Don't log during tests
  // Logging middleware
  // --------------------------------------------

  if (env !== 'test') {
    app.use(morgan(log));
  }

  // Set views path and default layout
  // --------------------------------------------

  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // Expose package.json to views
  // --------------------------------------------

  app.use(function(req, res, next) {
    res.locals.pkg = pkg;
    res.locals.env = env;
    next();
  });

  // BodyParser should be above methodOverride
  // --------------------------------------------

  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use(bodyParser.json());

  app.use(methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // Look in urlencoded POST bodies and delete it
      let method = req.body._method;
      delete req.body._method;
      return method;
    }
  }));

  // CookieParser should be above session
  // --------------------------------------------

  app.use(cookieParser());
  app.use(cookieSession({
    secret: 'secret'
  }));
  app.use(session({
    secret: pkg.name,
    proxy: true,
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
      url: config.db,
      collection: 'sessions'
    })
  }));

  // Use passport session
  // --------------------------------------------

  app.use(passport.initialize());
  app.use(passport.session());

  // Connect flash for flash messages - should be declared after sessions
  // --------------------------------------------

  app.use(flash());

  // Should be declared after session and flash
  // --------------------------------------------

  app.use(helpers(pkg.name));

  // Adds CSRF support
  // --------------------------------------------

  if (process.env.NODE_ENV !== 'test') {
    app.use(csrf());

    // This could be moved to view-helpers :-)
    app.use((req, res, next) => {
      res.locals.csrf = req.csrfToken();
      next();
    });
  }
};
