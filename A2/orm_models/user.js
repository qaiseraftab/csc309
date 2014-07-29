module.exports = function(db, cb) {
	db.define('user', {
		'id': { type: 'integer' },
		'username': { type: 'text' },
		'password': { type: 'text' },
		'join_date': { type: 'date' },
		'address': { type: 'text' },
		'latitude': { type: 'number' },
		'longitude': { type: 'number' },
		'rating': { type: 'number' },
		'rating_count': { type: 'integer' }
	},
	{
		'collection': 'users'
	});
	return cb();
};