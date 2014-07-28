module.exports = function(db, cb) {
	db.define('rating', {
		'rating': { type: 'integer' },
		'comment': { type: 'text' }
	},
	{
		'collection': 'ratings'
	});
	return cb();
};