/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Candidates = require('./candidates.model');

router.get('/candidates', function(req, res) {
    var getByName = Candidates.getByName(req.query.name);
    responseManager(req, res, getByName);
});

module.exports = router;
