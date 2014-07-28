module.exports = function(db, cb) {
	db.define("upload", {
		'id': { type: 'integer' },
		'posted_date': { type: 'date' }
	},
	{
		'collection': 'uploads'
	});
	return cb();
};