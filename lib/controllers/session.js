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
  passport.authenticate('local', function(err, user, info) {
    var error = err || info;
    if (user===false) return res.json(401, {message: "Invalid username/password"});
    req.user = user;
    req.logIn(user, function(err) {
      
      if (err) return res.send(err);
      var lel = {};

      lel._id = user.id;
      lel.provider = 'local';
      lel.name = user.username;
      lel.email = "a@b.com";
      lel.hashedPassword = user.password;
      lel.salt =  user.salt;
      lel.__v= 0;
      lel.role = 'user';

      res.json(lel);
    });
  })(req, res, next);
};
