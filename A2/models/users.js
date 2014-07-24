var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(id, callback) {
		var query = "SELECT * FROM users WHERE id = ? LIMIT 1";
		mysql_conn.query(query, [id], function(err, rows) {
			if (err) throw err;
			console.log(query);
			callback(rows[0]);
		});
	},
	find_by: function(field_name, val, callback) {
		var query = "SELECT * FROM users WHERE ?? = ? LIMIT 1";
		mysql_conn.query(query, [[field_name], val], function(err, rows) {
			console.log(query);
			if (err) {
				callback(null);
			}
			else {
				callback(rows[0]);
			}
		});
	},
	register: function(params, callback) {
		//register new user into users table
		console.log(params.longitude);
		var query_params = [
			params.email,
			params.username,
			params.first_name,
			params.last_name,
			params.pwd,
			params.province + " " + params.city + " " + params.location,
			params.longitude,
			params.latitude
		];
		var query = "INSERT INTO users (email, username, first_name, last_name, password, address, latitude, longitude) VALUES (?,?,?,?,?,?,?,?)";
		mysql_conn.query(query, query_params, function(err, result) {
			console.log(query);
			if (err) throw err;
			callback(result.insertId);
		});
	}
};