var express = require('express');

// Creating instance of express
var app = express();

// Setting up parsing middleware
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({'extended': 'true'}));

// Configuring static file folder
app.use(express.static(__dirname + '/www'));

// Importing API routes
require('./api/routes.js')(app);

// Starting listener
var port = process.env.PORT || 80;
var server = app.listen(port, function(){
	console.log('Aplication started on port: ' + port);
});

module.exports = server;
