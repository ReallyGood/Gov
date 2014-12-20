/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Lists = require('./lists.model');

router.get('/lists', function(req, res) {
    var method;

    if (req.query.special === 'topList') {
        method = Lists.getTopList();
    } else {
        return res.sendStatus(400).end();
    }

    responseManager(req, res, method);
});

router.post('/lists', function(req, res) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401).end();
    } else {
        var add = Lists.add(req.user, req.body);
        responseManager(req, res, add);
    }
});

router.get('/lists/:id', function(req, res) {
    var getById = Lists.getById(req.params.id);
    responseManager(req, res, getById);
});

module.exports = router;
