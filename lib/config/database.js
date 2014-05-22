
var sqlite3 = require('sqlite3');
var DB = new sqlite3.Database(process.env.DBPATH || 'db/default.db');