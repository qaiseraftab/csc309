module.exports = function(db, cb) {
	db.define('user', {
		'id': { type: 'integer' },
		'username': { type: 'text' },
		'password': { type: 'text' },
		'join_date': { type: 'date' },
		'address': { type: 'text' },
		'latitude': { type: 'number' },
		'longitude': { type: 'number' }
	},
	{
		'collection': 'users'
	});
	return cb();
};