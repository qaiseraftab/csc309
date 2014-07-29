var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');
var Q = require('q');

var default_fragment = "profile";

/* POST register user */
router.post('/register', function(req, res) {
	Users.register(req.body, function(id) {
		res.redirect("/terms-of-use");
	});
});

/* GET user page */
router.get('/:id(\\d+)', function(req, res) {
	req.orm_db.models.user.one({ 'id' : req.param('id')}, function(err, user) {
		if (user) {
			res.render('users/main',{
				user: user,
				frag: req.param('page') || default_fragment
			});
		}
	});
});

/* GET profile fragment */
router.get('/:id(\\d+)/profile', function(req, res) {
	req.orm_db.models.user.one({ 'id' : req.param('id')}, function(err, user) {
		var hosted_parties, attended_parties;

		user.getHostedParties(function(err, hp) {
			hosted_parties = (hp === undefined) ? [] : hp.length;
			user.getAttendedParties(function(err, ap) {
				attended_parties = (ap === undefined) ? [] : ap.length;
				res.render('users/profile_frag', {
					user: user,
					parties_created: hosted_parties,
					parties_attended: attended_parties
				});
			});
		});
	});
});

/* GET activity fragment */
router.get('/:id(\\d+)/activity', function(req, res) {
	req.orm_db.models.user.one({ 'id' : req.param('id')}, function(err, user) {
		user.getAttendedParties(function(err, ap) {
			res.render('users/activity_frag', {
				attended_parties: ap
			});
		});
	});
});

/* GET subscribers fragment */
router.get('/:id(\\d+)/subscribers', function(req, res) {
	req.orm_db.models.user.one({ 'id' : req.param('id')}, function(err, user) {
		user.getSubscribers(function(err, subscribers) {
			res.render('users/subscribers_frag', {
				subscribers: subscribers
			});
		});
	});
});

/* GET portfolio fragment */
router.get('/:id(\\d+)/portfolio', function(req, res) {
	req.orm_db.models.user.one({ 'id' : req.param('id')}, function(err, user) {
		user.getHostedParties(function(err, hp) {
			res.render('users/portfolio_frag', {
				hosted_parties: hp
			});
		});
	});
});

module.exports = router;
