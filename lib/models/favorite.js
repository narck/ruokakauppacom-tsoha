'use strict';

var db = require('../config/database').connect();

exports.list = function (res, user) {
  if (isNotAuthenticated(user)) {
    res.send(403); 
    return;
  }
    db.serialize(function() {
    db.all('SELECT * FROM products, favorites WHERE user_id = ? AND products.sku = favorites.sku', user._id , function(err, row) {
      if (err) {
        res.json({});
      }
      res.json(row);
    });
  });

  
}

exports.update = function (res, sku, user) {
  if (isNotAuthenticated(user)) {
    res.send(403); 
    return;
  }
    db.run('INSERT OR IGNORE INTO favorites(sku, user_id) VALUES(?,?)', sku, user._id, function (err, row) {
      if (!err) res.send(200);
    });
}


exports.delete = function (res, sku, user) {
  if (isNotAuthenticated(user)) {
    res.send(403); 
    return;
  }
  db.run('DELETE FROM favorites WHERE sku = ? AND user_id = ?', sku, user._id, function (err, row) {
      if (!err) res.send(200);
    });
}


// quick hack
function isNotAuthenticated(user) {
  return user === undefined;
}