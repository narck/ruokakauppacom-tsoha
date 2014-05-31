'use strict';


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.env.DBPATH);

exports.show = function (req, res, next) {
  var id = req.params.id;

  db.serialize(function() {
    db.get('SELECT * FROM products WHERE sku = ? ', id, function(err, row) {
      if (err) {
      	res.json({});
      }
      res.json(row);
    });
  });
};

exports.list = function (req, res, next) {

  db.serialize(function() {
    db.all('SELECT * FROM products WHERE category=(SELECT id FROM categories WHERE name="Ruoka ja juoma");', function(err, row) {
      if (err) {
      	res.json({});
      }
      res.json(row);
    });
  });
};


exports.random = function (req, res, next) {
  db.serialize(function() {
    db.all('SELECT * FROM products WHERE category=(SELECT id FROM categories WHERE name="Ruoka ja juoma");', function(err, row) {
      if (err) {
      	res.json({});
      }
      var randoms = [];
      for (var i = 0; i < 4; i++) {
        randoms.push(row[Math.floor(Math.random()*row.length)])
      };
      res.json(row);
    });
  });
};