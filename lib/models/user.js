'use strict';

var crypto = require('crypto'),
  db = require('../config/database').connect();


function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}


var UserSchema = {};


exports.findOne = function(userId) {
}

exports.create = function (res, user) { 

	var salt = crypto.randomBytes(16).toString('base64');
	user.password = hashPassword(user.password, salt);

	db.run('INSERT INTO users(username, password, salt) VALUES (?, ?, ?)', user.username, user.password, salt, function(err, row) {
      if (err) {
        res.json({'error': err.errno == 19 ? 'User exists' : err });
      }

      res.json({'user': user});
    });

};
exports.update = function () { }
exports.new = function () { }
exports.delete =  function () { }
exports.new = function () { }



