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
	}
};