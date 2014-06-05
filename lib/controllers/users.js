'use strict';

var passport = require('passport'),
    User = require('../models/user');

/**
 * Create user
 */
exports.create = function (req, res, next) {
	console.log(res)
  var user = {};
  user.username = String(req.body.username);
  user.password = String(req.body.password);
  
  User.create(res, user);
}

/**
 *  Get profile of specified user
 */
// exports.show = function (req, res, next) {
//   var id = req.params.id;
//   db.serialize(function() {
//     db.get('SELECT name FROM users WHERE id = ? ', id, function(err, row) {
//       if (err) {
//         res.json({'error': err});
//       }
//       res.json(row);
//     });
//   });
// };

exports.show = function() {}

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  User.update(req, res);
}

exports.delete = function(req, res, next) {

}

/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
}