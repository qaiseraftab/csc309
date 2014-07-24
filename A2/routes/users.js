var express = require('express');
var router = express.Router();
var Users = require('../models/users.js');

/* POST register user */
router.post('/register', function(req, res) {
	Users.register(req.body, function(id) {
		res.redirect("/terms-of-use");
	});
});

module.exports = router;
