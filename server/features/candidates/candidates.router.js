/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Candidates = require('./candidates.model');

router.get('/candidates', function(req, res) {
    var getByCandidateName = Candidates.getByCandidateName(req.query.candidateName);
    responseManager(req, res, getByCandidateName);
});

module.exports = router;
