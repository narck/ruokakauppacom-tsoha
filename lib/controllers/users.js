'use strict';

var passport = require('passport'),
    User = require('../models/user');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var user = {};
  user.username = String(req.body.username);
  user.password = String(req.body.password);
  
  User.create(res, user);
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
  var userId = req.user.id;
  
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  db.serialize(function() {
    db.get('SELECT salt, password FROM users WHERE id = ?', userId, function (err, row){
      var hashedPassword = row.password;

    });
  });

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