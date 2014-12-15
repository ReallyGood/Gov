/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Lists = require('./lists.model');

router.get('/lists', function(req, res) {
    var method;

    // Doesn't works yet, and I'm pretty sure it shouldn't work like that..
    // It's only exists in the first request after login
    if (req.sessionStore.sessions[req.sessionID]) {
        console.log(JSON.parse(req.sessionStore.sessions[req.sessionID]).passport.user);
    }

    if (req.query.special === 'topList') {
        method = Lists.getTopList();
    } else {
        method = Lists.getAll();
    }

    responseManager(req, res, method);
});

router.post('/lists', function(req, res) {
    var add = Lists.add(req.body);
    responseManager(req, res, add);
});

router.get('/lists/:id', function(req, res) {
    var getById = Lists.getById(req.params.id);
    responseManager(req, res, getById);
});

module.exports = router;
