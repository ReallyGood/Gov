/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Candidates = require('./candidates.model');

router.get('/candidates', function(req, res) {
    var method;

    if (req.query.candidateName && req.query.roleName) {
        method = Candidates.countCandidateVotesForRoleName(req.query.candidateName, req.query.roleName);
    } else if (req.query.roleName) {
        method = Candidates.getMostPopularCandidatesByRoleName(req.query.roleName);
    } else if (req.query.candidateName) {
        method = Candidates.getByCandidateName(req.query.candidateName);
    }

    responseManager(req, res, method);
});

module.exports = router;
