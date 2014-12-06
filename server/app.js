/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

var config = require('./config');
var routersManager = require('./common/routersManager')(app);

routersManager.registerRouters();

app.listen(config.server.port);

console.log('Server started on port %d', config.server.port);
