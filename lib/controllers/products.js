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

// exports.list = function(req, res, next) {
  
//   Product.find(
//     {},
//     function (err, products) {
//     if (!err){
//       // for debugging
//       //console.log(products);
//       res.send( products );
//     } else {throw err;}    
//   });
// };