'use strict';

var db = require('../config/database').connect();

var ProductSchema = {};

exports.findOne = function (res, sku) {
  db.serialize(function() {
    db.get('SELECT * FROM products WHERE sku = ? ', sku, function(err, row) {
      if (err) {
      	res.json({});
      }
      res.json(row);
    });
  });
}


exports.list = function (res, sku) {
  db.serialize(function() {
    db.all('SELECT * FROM products WHERE category=(SELECT id FROM categories WHERE name="Ruoka ja juoma");', function(err, row) {
      if (err) {
        res.json({});
      }
      res.json(row);
    });
  });
}


exports.randomized = function (res, sku) {
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
}