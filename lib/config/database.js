
var sqlite3 = require('sqlite3');

exports.DB = new sqlite3.Database(process.env.DBPATH || 'db/default.db');