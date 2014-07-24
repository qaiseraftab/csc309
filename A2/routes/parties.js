var express = require('express');
var router = express.Router();
var Parties = require('../models/parties.js');
var Search = require('../models/search.js');
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

/* POST completed party */
router.post('/completed', function(req, res) {
	console.log(req.body.page);
	Parties.completed(req.body.page, function(id) {
		//res.status(204);	
	});
});

/* GET streaming parties */
router.get('/streaming', function(req, res) {
	res.render('parties/streaming');
});

/* GET party search engine results */
router.get('/search_results', function(req, res) {
	if(req.query.search == "") {
		res.render('parties/search_result', {
			parties : []
		});
	} else {
		Search.find(req.query.search, function(result) {
			console.log(result);
			res.render('parties/search_result', {
				parties : result
			});
		});
	}
});

/* GET party pages */
router.get('/:id(\\d+)', function(req, res) {
	Parties.find(req.param('id'), function(party) {
		console.log(party.ended);
		res.render('parties/show', {
			pname: party.name,
			date: party.start_date,
			description: party.description,
			location: party.location,
			capacity: party.capacity,
			ended: 0
		});
	});
});

module.exports = router;
