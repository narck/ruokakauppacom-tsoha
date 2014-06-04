'use strict';
var Product = require('../models/product');
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.env.DBPATH);

exports.show = function (req, res, next) {
  var sku = req.params.id;
  
  Product.findOne(res, sku);
};

exports.list = function (req, res, next) {
  Product.list(res);
};


exports.random = function (req, res, next) {
  Product.randomized(res);
};