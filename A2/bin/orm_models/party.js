module.exports = function(db, cb) {
	db.define('party', {
		'id': { type: 'integer' },
		'name': { type: 'text' },
		'capacity': { type: 'integer'},
		'address': { type: 'text' },
		'latitude': { type: 'number' },
		'longitude': { type: 'number' },
		'description': { type: 'text' },
		'posted_date': { type: 'date' },
		'start_date': { type: 'date' },
		'end_date': { type: 'date' },
		'ended': { type: 'boolean' },
		'featured_until': { type: 'date' },
		'streaming': { type: 'boolean' },
		'private': { type: 'boolean' },
		'food_provided': { type: 'boolean' },
		'alcohol': { type: 'boolean' },
		'parking': { type: 'boolean' },
		'adult_only': { type: 'boolean' }
	},
	{
		'collection': 'parties'
	});
	return cb();
};