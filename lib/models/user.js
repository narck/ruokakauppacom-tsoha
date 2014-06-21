'use strict';

var crypto = require('crypto'),
  db = require('../config/database').connect();


function hashPassword(password, salt) {
  var hash = crypto.createHash('sha256');
  hash.update(password);
  hash.update(salt);
  return hash.digest('hex');
}

function User() {

}

exports.findOne = function(res, userId) {q

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

}

exports.update = function (req, res) {
  var userId = req.user._id;

  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  db.serialize(function() {
    db.get('SELECT salt, password FROM users WHERE id = ?', userId, function (err, row){
      var salt = row.salt;
      if (err) res.send(403);

      var hashedPassword = row.password;
      if (hashedPassword === hashPassword(oldPass, row.salt)) {
        db.run('UPDATE users SET password = ? WHERE id = ?', hashPassword(newPass, salt), userId, function (err, row) {
          if (!err) res.send(200);
        });
      } else {
        res.send(403);
      };
    });
  });
}


exports.delete = function (res, user) {
  if (user.name === 'test') res.json(403); // cannot delete default user
  db.run('DELETE FROM users WHERE username = ? AND id = ?', user.name, user._id, function (err, row) {
    if (err) res.json(err);
    res.json('OK');
  });
}
