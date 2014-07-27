module.exports = function(models) {
	//Users
	models.user.hasMany('subscribers', models.user, {}, {
		mergeTable: 'subscribes_to',
		mergeId: 'user',
		mergeAssocId: 'subscriber',
		reverse: 'subscriptions'
	});
	models.user.hasMany('album_uploads', models.upload, {}, {
		mergeTable: 'user_album',
		mergeId: 'owner',
		mergeAssocId: 'picture'
	});

	//Parties
	models.party.hasOne('host', models.user, {}, {
		field: 'host',
		reverse: 'hosted_parties'
	});
	models.party.hasMany('attendees', models.user, {}, {
		mergeTable: 'attends',
		mergeId: 'party',
		mergeAssocId: 'guest',
		reverse: 'attended_parties'
	});
	models.party.hasMany('raters', models.user, { 'rating': 'integer', 'comment': String }, {
		mergeTable: 'ratings',
		mergeId: 'rated_for',
		mergeAssocId: 'rated_by',
		reverse: 'rated_parties'
	});
	models.party.hasMany('album_uploads', models.upload, {}, {
		mergeTable: 'party_album',
		mergeId: 'owner',
		mergeAssocId: 'picture'
	});

	//Uploads
	models.upload.hasOne('owner', models.user, {}, {
		field: 'owner',
		reverse: 'uploads'
	});

	//Ratings
	models.rating.hasOne('rater', models.user, {}, {
		field: 'rated_by',
		reverse: 'given_ratings'
	});
	models.rating.hasOne('party', models.party, {}, {
		field: 'rated_for',
		reverse: 'ratings'
	});
};