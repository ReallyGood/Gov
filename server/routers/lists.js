/**
 * Created by Adir on 06/12/2014.
 */
var express = require('express');
var router = express.Router();

router.get('/lists', function(req, res){
    res.send('all lists');
});

router.get('/lists/:id', function(req, res){
    res.send('list #' + req.params.id);
});

module.exports = router;
