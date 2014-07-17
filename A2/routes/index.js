var express = require('express');
var router = express.Router();
var Parties = require('../models/parties.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.render('homepage');
});

/* GET about us. */
router.get('/about_us', function(req, res) {
	res.render('about-us');
});

/* GET terms of use. */
router.get('/terms_of_use', function(req, res) {
	res.render('terms-of-use');
});

/* GET privacy policy. */
router.get('/privacy_policy', function(req, res) {
	res.render('privacy-policy');
})

/* GET site map. */
router.get('/site_map', function(req, res) {
	res.render('site-map');
});

/* GET register or login. */
router.get('/register_login', function(req, res) {
	res.render('register-login');
});


//Parties

/* GET featured parties */
router.get('/parties/featured', function(req, res) {
	res.render('featured-parties');
});

/* GET create party form */
router.get('/parties/new', function(req, res) {
	res.render('host-a-party.html');
});

/* POST create party --- from Richard */
router.post('/parties/create', function(req, res) {
	Parties.create(req.body, function(id) {
		res.redirect("/parties/" + id);
	});
});

/* GET streaming parties */
router.get('/parties/streaming', function(req, res) {
	res.render('live-stream');
});

/* GET party search engine results */
router.get('/parties/search_results', function(req, res) {
	res.render('search-party');
});

/* GET party pages */
router.get('/parties/:id', function(req, res) {
	Parties.find(req.param('id'), function(party) {
		res.render('individual-party-page', {
			pname: party.name,
			date: party.start_date,
			description: party.description,
			location: party.location,
			capacity: party.capacity
		});
	});
});

module.exports = router;
