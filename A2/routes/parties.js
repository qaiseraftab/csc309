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
	if(req.user) {	
		res.render('parties/new');
	} else {
		res.redirect("/redirect");	
	}
});

/* POST create party --- from Richard */
router.post('/create', function(req, res) {
	Parties.create(req.body, req.user.id, function(id) {
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

/* GET user parties */
router.get('/my-parties', function(req, res) {
	if(req.user) {	
		Parties.user(req.user.id, function(result) {
			res.render('parties/my-parties', { 
				parties : result	
			});
		});
	} else {
		res.redirect("/redirect");	
	}
});

/* GET stream party page */
router.get('/stream-party/:id(\\d+)', function(req, res) {
	if(req.user) { 
		if(req.user.id == req.params.id) { 
			res.render('parties/stream-party', {
				correct : 1,
				hostid : req.params.id	
			});
		} else {
			res.render('parties/stream-party', {
				correct : 0,
				hostid : req.params.id
			});
		}
	} else {
		res.render('redirect');
	} 
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
		console.log(party);
		Search.find(party.name, 4, req.param('id') , function(result) {
			res.render('parties/show', {
				pname: party.name,
				host: party.username,
				date: party.start_date,
				description: party.description,
				location: party.location,
				capacity: party.capacity,
				ended: 0,
				parties: result,
				hostid: req.param('id')
			});
		});
	});
});

module.exports = router;
