'use strict';

var passport = require('passport'),
    crypto = require('crypto'),
    User = require('../models/user');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.env.DBPATH);

function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}


/**
 * Create user
 */
exports.create = function (req, res, next) {
  var user = {};
  user.username = String(req.body.username);

  var salt = crypto.randomBytes(256);
  var password = String(req.body.password);
  user.password = hashPassword(password, salt);

    db.run('INSERT INTO users(username, password, salt) VALUES (?, ?, ?)', user.username, user.password, salt, function(err, row) {
      if (err) {
        res.json({'error': err.errno == 19 ? 'User exists' : err });
      }
      res.json({'user': user});
    });

};

/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var id = req.params.id;
  db.serialize(function() {
    db.get('SELECT name FROM users WHERE id = ? ', id, function(err, row) {
      if (err) {
        res.json({'error': err});
      }
      res.json(row);
    });
  });
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  // var userId = req.user._id;
  // console.log(userId);
  // var oldPass = String(req.body.oldPassword);
  // var newPass = String(req.body.newPassword);

  // User.findById(userId, function (err, user) {
  //   if(user.authenticate(oldPass)) {
  //     user.password = newPass;
  //     user.save(function(err) {
  //       if (err) return res.send(400);

  //       res.send(200);
  //     });
  //   } else {
  //     res.send(403);
  //   }
  // });
};

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};