'use strict';

var sqlite3 = require('sqlite3');

exports.connect = function() {
	 return new sqlite3.Database(process.env.DBPATH || 'db/default.db');
}