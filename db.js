
"use strict";

var fs = require("fs");
var sqlite3 = require("sqlite3");
var exports = module.exports = {};
var repository = "./db/simple.sqlite";

exports.getEmployees = function (callback) {
	var db = new sqlite3.Database(repository);
	var query = "SELECT ID, Name, Designation, Email FROM Employee";
	db.all(query, function (err, rows) {
		if (err) {
			callback(err,null);
			return;
		}
		callback(null, rows);
		return;
	});
	db.close();
}
