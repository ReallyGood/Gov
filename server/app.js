/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');

var app = express();

var config = require('./config');
var routersManager = require('./routers/routersManager')(app);

routersManager.registerRouters();
app.listen(config.server.port);

console.log('Server started on port %d', config.server.port);
