var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	res.render('homepage', {
		current_user: req.user
	});
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

/* GET redirect page to register or login*/
router.get('/redirect', function(req, res) {
	res.render('redirect');
});

module.exports = router;
