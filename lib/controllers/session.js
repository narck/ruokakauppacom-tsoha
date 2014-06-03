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
      var resUser = {};

      resUser._id = user.id;
      resUser.provider = 'local';
      resUser.name = user.username;
      resUser.email = "a@b.com";
      resUser.hashedPassword = user.password;
      resUser.salt =  user.salt;
      resUser.__v= 0;
      resUser.role = 'user';

      res.json(resUser);
    });
  })(req, res, next);
};
