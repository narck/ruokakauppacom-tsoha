'use strict';
var Product = require('../models/product');

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