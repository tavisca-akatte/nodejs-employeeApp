"use strict";

var fs = require("fs");
var sqlite = require("sqlite3");
var exports = module.exports = {};
var repository = "./db/simple.sqlite";

exports.getEmployees = function (callback) {
	var db = new sqlite.Database(repository);
	var query = "SELECT ID, Name, Designation, Email FROM Employee";
	db.all(query, function (error, rows) {
		if (error) {
			callback(error, null);
		}
		callback(null, rows);
	});
	db.close();
}

exports.getEmployee = function (empId, callback) {
	var db = new sqlite.Database(repository);
	var query = "SELECT ID, Name, Designation, Email FROM Employee WHERE ID =" + empId;
	db.all(query, function (error, rows) {
		if (typeof rows !== "undefined") {
			callback(null, rows[0]);
		} else {
			callback(null, null);
		}
	});
	db.close();
}

exports.updateEmployee = function (employee, callback) {
	var db = new sqlite.Database(repository);
	var statement = db.prepare("UPDATE Employee SET Name = ? , Designation = ? , Email = ?  WHERE ID = ?");
	statement.bind(employee.Name, employee.Designation, employee.Email, employee.ID);
	statement.run(function (error) {
		if (error) {
			console.log(error);
			callback(this.changes);

		} else {
			callback(this.changes);
		}
	});
}

exports.deleteEmployee = function (empId, callback) {
	var db = new sqlite.Database(repository);
	var statement = db.prepare("Delete FROM Employee WHERE ID = ?");
	statement.bind(empId);
	statement.run(function (error) {
		if (error) {
			console.log(error);
			callback(this.changes);

		} else {
			callback(this.changes);
		}
	});
}

exports.addEmployee = function (employee, callback) {
	var db = new sqlite.Database(repository);
	var statement = db.prepare("INSERT INTO Employee (Name,Designation,Email) VALUES (?,?,?)");
	statement.bind(employee.Name, employee.Designation, employee.Email);
	statement.run(function (error) {
		if (error) {
			console.log(error);
			callback(this.changes);

		} else {
			callback(this.changes);
		}
	});
}
