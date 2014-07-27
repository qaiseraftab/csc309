var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');

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
		res.render('users/profile_frag', {
			user: user
		});
	});
});

/* GET activity fragment */
router.get('/:id(\\d+)/activity', function(req, res) {
	res.render('users/activity_frag', {

	});
});

/* GET subscribers fragment */
router.get('/:id(\\d+)/subscribers', function(req, res) {
	res.render('users/subscribers_frag', {

	});
});

/* GET portfolio fragment */
router.get('/:id(\\d+)/portfolio', function(req, res) {
	res.render('users/portfolio_frag', {

	});
});

module.exports = router;
