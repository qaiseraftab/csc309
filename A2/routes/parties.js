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
		Search.find(req.query.search, 4294967295, 0, function(result) {
			res.render('parties/search_result', {
				parties : result
			});
		});
	}
});

/* GET party pages */
router.get('/:id(\\d+)', function(req, res) {
	Parties.find(req.param('id'), function(party) {
		Search.find(party.name, 4, req.param('id') , function(result) {
			res.render('parties/show', {
				pname: party.name,
				date: party.start_date,
				description: party.description,
				location: party.location,
				capacity: party.capacity,
				ended: 0,
				parties: result
			});
		});
	});
});

module.exports = router;
