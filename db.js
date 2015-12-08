"use strict";

var fs = require("fs");
var sqlite = require("sqlite3");
var exports = module.exports = {};
var repository = "./db/simple.sqlite";

exports.getEmployees = function (callback) {
    var db = new sqlite.Database(repository);
    var query = "SELECT ID, Name, Designation, Email FROM Employee";
    db.all(query, function (err, rows) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows);
        return;
    });
    db.close();
}

exports.getEmployee = function (empId, callback) {
    var db = new sqlite.Database(repository);
    var query = "SELECT ID, Name, Designation, Email FROM Employee WHERE ID ="+empId;
    db.all(query, function (err, rows) {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, rows[0]);
        return;
    });
    db.close();
}

exports.updateEmployee = function(employee, callback){
    var db = new sqlite.Database(repository);
    var statement = db.prepare("UPDATE Employee SET Name = ? , Designation = ? , Email = ?  WHERE ID = ?");
    statement.bind(employee.Name, employee.Designation, employee.Email, employee.ID);
    statement.run(function(err) {
        if (err) {
            console.log(err);
            callback(this.changes);

        } else {
            callback(this.changes);
        }
    });
}

exports.deleteEmployee = function(empId, callback){
    var db = new sqlite.Database(repository);
    var statement = db.prepare("Delete FROM Employee WHERE ID = ?");
    statement.bind(empId);
    statement.run(function(err) {
        if (err) {
            console.log(err);
            callback(this.changes);

        } else {
            callback(this.changes);
        }
    });
}