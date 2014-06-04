'use strict';

var passport = require('passport'),
    db = require('../config/database').connect(),
    crypto = require('crypto'),
    LocalStrategy = require('passport-local').Strategy;




function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

passport.use(new LocalStrategy(function(username, password, done) {
  db.get('SELECT salt FROM users WHERE username = ?', username, function(err, row) {
    if (!row) return done(null, false);
    var hash = hashPassword(password, row.salt);
    db.get('SELECT username, password, id, salt FROM users WHERE username = ? AND password = ?', username, hash, function(err, row) {
      if (!row) return done(null, false);
      
      return done(null, row);
    });
  });
}));

passport.serializeUser(function(user, done) {
  return done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  db.get('SELECT id, username, password FROM users WHERE id = ?', id, function(err, row) {
    if (!row) return done(null, false);
    var user = {
    "_id": row.id,
    "provider": "local",
    "name": row.username,
    "email": "test@test.com",
    "__v": 0,
    "role": "user"
    };
    return done(null, user);
  });
});
