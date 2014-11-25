'use strict';

var http = require('http');
var express = require('express');
var routes = require('./lib/routes');
var logger = require('morgan');
var parser = require('body-parser');
var app = express();
var auth = require('basic-auth');
var server = http.createServer(app);

app.use(logger('combined' ));
app.use(parser.json());
app.use(function(req, res, next) {
	var user = auth(req);

	if (user === undefined || user['name'] !== 'nori' || user['pass'] !== 'cz812ce') {
		res.statusCode =401;
		res.setHeader('www-Authenticate', 'Basic realm="MyRealmName"');
		res.end('Unauthorized');
	} else {
		next();
	}
});
app.use( express.static( __dirname+ '/public' ) );

routes.configRoutes(app,server);

server.listen(3333);
