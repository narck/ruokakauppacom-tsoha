'use strict';


var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(process.env.DBPATH);


/**
 * Get awesome things
 */


exports.awesomeThings = function(req, res) {
  var things = [];
  things.push(1);
  db.serialize(function() {
  db.all('SELECT name AS name, price AS price FROM products LIMIT 10', function(err, rows) {
    res.json(rows);
  });
});
};
