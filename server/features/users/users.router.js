/**
 * Created by Dean on 08/12/2014.
 */
var express = require('express');
var router = express.Router();

var passport = require('passport');

router.get('/auth/facebook/login', function(req, res, next) {
    passport.authenticate(
        'facebook',
        {
            scope: ['email'],
            callbackURL: '/auth/facebook/login_callback'
        }
    )(req, res, next);
});

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/login_callback', function(req, res, next) {
    passport.authenticate(
        'facebook',
        {
            callbackURL: '/auth/facebook/login_callback',
            successRedirect: 'http://localhost:9000',
            failureRedirect: 'http://localhost:9000'
        }
    )(req, res, next);
});

router.get('/loggedin', function(req, res) {
    res.json(req.isAuthenticated() ? req.user : null);
});

router.get('/logout', function(req, res) {
    req.logout();
    res.status(200).end();
});

module.exports = router;
