var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(id, callback) {
		var query = "SELECT * FROM users WHERE id = ? LIMIT 1";
		mysql_conn.query(query, [id], function(err, rows) {
			if (err) throw err;
			console.log(query);
			callback(rows[0]);
		});
	}
};