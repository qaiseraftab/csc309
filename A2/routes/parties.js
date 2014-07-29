var express = require('express');
var router = express.Router();
var Parties = require('../models/parties.js');
var Search = require('../models/search.js');
var fs = require('fs');
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
router.post('/create', function(req, res, cb) {
	var num_files;
	fs.readdir(__dirname + '/../public/temp_uploads', function(err, files) {
		if (!err) {
			num_files = files;
			return num_files;
		}
		else console.log(err);
	});
	if (num_files == undefined) {
		num_files = [];
	}
	Parties.create(req.body, req.user.id, function(id) {
		var new_dir = __dirname + '/../public/uploads/'+req.user.id;
		fs.mkdir(new_dir, function(err) {
			if (err) {
				if (err.code == 'EEXIST') cb (null);
				else cb(err);
			} else cb(null);
		});
		var file_names;
		fs.readdir(new_dir, function(err, files) {
			if (!err) { 
				file_names = files;
				return file_names;
			}
			else console.log(err);
		});
		if (file_names == undefined) {
			file_names = [];
		}
		for (var i = 1; i <= num_files.length; i++) {
			fs.rename(__dirname + "/../public/temp_uploads/" + num_files[i-1], new_dir + "/" + (id + "_" + i) + "." + num_files[i-1].split('.').pop(), function(err) {
				if (err) throw err;
			});
		}
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
			var photo_dir = __dirname + '/../public/uploads/'+party.host;
			console.log(photo_dir);
			var imagess = [];
			var file_names = fs.readdirSync(photo_dir);
			console.log(1);
			/*fs.readdir(photo_dir, function(err, files) {
				console.log(1);
				if (!err) { 
					file_names = files;
					return file_names
				}
				else console.log(err);
			});*/
			console.log(2);
			console.log(file_names);
			if (file_names != undefined) {
				var patt = new RegExp(req.param('id')+"_");
				for(var i=0; i < file_names.length; i++) {
					console.log(file_names[i]);
					if(patt.test(file_names[i])) {
						imagess.push(file_names[i]);					
					}				
				}			
			}
			console.log(imagess);
			var correct_user;
			if(req.user) {
				if (req.user.id == party.host) {
					correct_user = 1;
				} else {
					correct_user = 0;
				}
			} else {
				correct_user = 0;
			}
			res.render('parties/show', {
				pname: party.name,
				host: party.u_username,
				date: party.start_date,
				description: party.description,
				location: party.address + " " + party.city + ", " + party.province,
				capacity: party.capacity,
				ended: 0,
				parties: result,
				hostid: req.param('id'),
				images: imagess,
				correct_user: correct_user,
				rating: party.rating,
				rating_count: party.rating_count,
				latitude: party.latitude,
				longitude: party.longitude
			});					
			//return file_names;
		});
	});
});

module.exports = router;
