var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(id, callback) {
		var query = "SELECT * FROM parties p, users u WHERE p.id = ? AND p.host = u.id LIMIT 1";
		mysql_conn.query(query, [id], function(err, rows) {
			if (err) throw err;
			callback(rows[0]);
		});
	},
	create: function(params, user, callback) {
		//Insert into parties table --- from Richard
		var query = "INSERT INTO parties (name, host, capacity, address, latitude, longitude, start_date, description, streaming, private, food_provided, alcohol, parking, adult_only) VALUES (?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?)";
		var query_params = [
			params.pname, 
			user, //TODO: Find way to determine host ID 
			params.capacity, 
			params.address + ", " + params.city + ", " + params.province,
			params.longitude,
			params.latitude,
			params.date,
			params.description,
			params.streaming,
			params.private,
			params.food,
			params.alcohol,
			params.parking,
			params.mature
		];

		for (var i = 0; i < query_params.length; i++) {
			if (query_params[i] == null) {
				console.log(query_params[i] + ", " + i);
				query_params[i] = 0;
			}
		}

		mysql_conn.query(query, query_params, function(err, result) {
			if (err) throw err;
			callback(result.insertId);
		});
	},
	completed: function(id, callback) {
		var query = "UPDATE parties SET ended = 1 WHERE id = ?";
		mysql_conn.query(query, id, function(err, result) {
			if (err) throw err;
			callback(result);
		});					
	}
};
