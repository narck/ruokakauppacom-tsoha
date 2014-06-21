'use strict';

var Favorite = require('../models/favorite');

exports.list = function (req, res) {  
  Favorite.list(res, req.user);
}

exports.update = function (req, res) {  
  Favorite.update(res, req.body.sku, req.user);
}

exports.delete = function (req, res) {
  Favorite.delete(res, req.body.sku, req.user);
}
