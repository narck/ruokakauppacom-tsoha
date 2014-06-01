'use strict';

var passport = require('passport');

/**
 * Logout
 */
exports.logout = function (req, res) {
  req.logout();
  res.send(200);
};

/**
 * Login
 */
exports.login = function (req, res, next) {
  passport.authenticate('local', {session: "true"}, function(err, user, info) {
    var error = err || info;
    if (user===false) return res.json(401, {message: "Invalid username/password"});
    req.user = user;
    req.logIn(user, function(err) {
      
      if (err) return res.send(err);
      user.role = 'user';
      user.provider = 'local';
      req.user = user;
      res.json(user);
    });
  })(req, res, next);
};

