'use strict';

var Meal = require('../models/meal');

exports.create = function (req, res) {  
  Meal.create(res);
}
