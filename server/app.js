/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var app = express();

function allowCrossDomain(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.get('origin'));
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', 'true');

    next();
}
app.use(allowCrossDomain);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    secret: 'whatever123',
    resave: false,
    saveUninitialized: true
}));

var config = require('./config');
var routersManager = require('./common/routersManager')(app);

routersManager.initializePassport();
routersManager.registerRouters();

app.listen(config.server.port);

console.log('Server started on port %d', config.server.port);
