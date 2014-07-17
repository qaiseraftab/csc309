var express = require('express');
var router = express.Router();
var Parties = require('../models/parties.js');

//Parties

/* GET featured parties */
router.get('/featured', function(req, res) {
	res.render('parties/featured');
});

/* GET create party form */
router.get('/new', function(req, res) {
	res.render('parties/new');
});

/* POST create party --- from Richard */
router.post('/create', function(req, res) {
	Parties.create(req.body, function(id) {
		res.redirect("/parties/" + id);
	});
});

/* GET streaming parties */
router.get('/streaming', function(req, res) {
	res.render('parties/streaming');
});

/* GET party search engine results */
router.get('/parties/search_results', function(req, res) {
	Search.find(req.query.search, function(result) {
		res.render('search_result', {
			parties : result
		});
	});
});

/* GET party pages */
router.get('/:id(\\d+)', function(req, res) {
	Parties.find(req.param('id'), function(party) {
		res.render('parties/show', {
			pname: party.name,
			date: party.start_date,
			description: party.description,
			location: party.location,
			capacity: party.capacity
		});
	});
});

module.exports = router;
