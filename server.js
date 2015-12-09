var http = require('http');
var express = require('express');
var db = require('./db.js');
const PORT = 3000;
var bodyParser = require('body-parser')

	var server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({
		extended : true
	}));

var options = {
	index : 'index.html'
}

server.use(express.static(__dirname + '/public', options));

server.get('/employees/', function (req, res) {
	db.getEmployees(function (error, result) {
		res.contentType('application/json');
		//console.log(result);
		res.end(JSON.stringify(result));
	});

});

server.get('/employee/:id', function (req, res) {
	var empId = req.params.id;
	db.getEmployee(empId, function (error, result) {
		res.contentType('application/json');
		//console.log(result);
		res.end(JSON.stringify(result));
	});

});

server.post('/edit', function (req, res) {
	var employee = req.body;
	console.log(employee);
	db.updateEmployee(employee, function (result) {
		console.log(result);
		if (result === 1) {
			res.writeHead(200,{'Content-Type': 'text/plain'});
		} else {
			res.writeHead(500,{'Content-Type': 'text/plain'});
		}
		res.end(JSON.stringify(result));
	});

});

server.delete ('/delete/:id', function (req, res) {
	var empId = req.params.id;
	db.deleteEmployee(empId, function (result) {
		console.log(result);
		if (result === 1) {
			res.writeHead(200,{'Content-Type': 'text/plain'});
		} else {
			res.writeHead(500,{'Content-Type': 'text/plain'});
		}
		res.end(JSON.stringify(result));
	});

});

server.post('/add', function (req, res) {
	var employee = req.body;
	console.log(employee);
	db.addEmployee(employee, function (result) {
		console.log(result);
		if (result === 1) {
			res.writeHead(200,{'Content-Type': 'text/plain'});
		} else {
			res.writeHead(500,{'Content-Type': 'text/plain'});
		}
		res.end(JSON.stringify(result));
	});

});

http.createServer(server).listen(PORT);

console.log('Express server is running at http://localhost:' + PORT);
