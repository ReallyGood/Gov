/**
 * Created by Dean on 08/12/2014.
 */
var express 		= require('express');
var router 			= express.Router();
var passport 		= require('passport');

router.get('/auth/facebook/login', function(req, res, next) {
	passport.authenticate(
		'facebook',
		{scope: ['email'],
		callbackURL: '/auth/facebook/login_callback/'}
		) (req, res, next);
});

// handle the callback after facebook has authenticated the user
router.get('/auth/facebook/login_callback', function(req, res, next) {
	passport.authenticate(
		'facebook',
		{
			callbackURL:'/auth/facebook/login_callback/',
			//TODO: correct urls
			successRedirect : '/lists',
			failureRedirect : '/app/404.html'
		}
	) (req, res, next);
});

module.exports = router;