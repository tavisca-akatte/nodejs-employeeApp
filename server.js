var http = require('http');
var express = require('express');
var db = require('./db.js');
const PORT = 3000;
var server = express();

var options = {
	index : 'index.html'
}

server.use(express.static(__dirname + '/public', options));

server.get('/employees/', function (req, res) {
	db.getEmployees(function (error,result) {
		res.contentType('application/json');
		//console.log(result);
		res.send(JSON.stringify(result));
	});

});

http.createServer(server).listen(PORT);

console.log('Express server is running at http://localhost:' + PORT);
