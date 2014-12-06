/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

var Lists = require('../models/lists');

router.get('/lists', function(req, res) {
	res.send(Lists.getAll());
});

router.get('/lists/:id', function(req, res) {
	res.send(Lists.getById(req.params.id));
});

module.exports = router;
