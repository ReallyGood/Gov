/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');

    next();
}
app.use(allowCrossDomain);
app.use(bodyParser.json());

var config = require('./config');
var routersManager = require('./common/routersManager')(app);

routersManager.initializePassport();
routersManager.registerRouters();

app.listen(config.server.port);

console.log('Server started on port %d', config.server.port);
