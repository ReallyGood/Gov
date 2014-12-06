/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var responseManager = require('../../common/responseManager');
var Lists = require('./model');

router.get('/lists', function(req, res) {
    var getAll = Lists.getAll();
    responseManager(req, res, getAll);
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
