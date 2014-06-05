'use strict';

var passport = require('passport'); 


var api = require('./controllers/api'),
    index = require('./controllers'),
    products = require('./controllers/products'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    meal = require('./controllers/meal'),
    middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app) {

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);

  app.route('/api/products/:id')
    .get(products.show);
  app.route('/api/products')
    .get(products.list);
    
  app.route('/api/meal')
    .get(meal.create);

  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

app.post('/login', passport.authenticate('local', { successRedirect: '/good-login',
                                                    failureRedirect: '/bad-login' }));
  // app.route('login')
  //   .post(passport.authenticate('local',
  //     { successRedirect: '/lel',
  //       failureRedirect: '/kek'}));

  // app.route('/good-login')
  //   .get(users.me);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);
  

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);
};