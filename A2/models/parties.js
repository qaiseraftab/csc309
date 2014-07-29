var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(id, callback) {
		var query = "SELECT * FROM parties p INNER JOIN (SELECT u.id as u_id, u.username as u_username FROM users u) u ON p.host = u.u_id WHERE p.id = ? LIMIT 1";
		mysql_conn.query(query, [id], function(err, rows) {
			if (err) throw err;
			console.log(rows[0]);
			callback(rows[0]);
		});
	},
	create: function(params, user, callback) {
		//Insert into parties table --- from Richard

		//var query = "INSERT INTO parties (name, host, capacity, address, city, province, latitude, longitude, start_date, description, streaming, private, food_provided, alcohol, parking, adult_only) VALUES (?,?,?,?,?,?,?,?,?,?,?, ?, ?, ?, ?, ?)";
		var time = params.time;
		var AmPm = params.AmPm;
		var patt = new RegExp("12:[0-5][0-9]");
		if(AmPm == "12.00") {
			if(patt.test(time)) {
				var s_date = params.date.replace(/\//g, "-") + " " + params.time + ":00"; 
			} else {
				var newtime = (Number(params.time.replace(":", ".")) + Number(AmPm)).toFixed(2).replace(".", ":");
				var s_date = params.date.replace(/\//g, "-") + " " + newtime  + ":00";
			}
		} else {
			if(time == "12:00") {
				var s_date = params.date.replace(/\//g, "-") + " 00:00:00";
			} else {
				var s_date = params.date.replace(/\//g, "-") + " " + params.time + ":00";
			}
		}
		var query = "INSERT INTO parties (name, host, capacity, address, city, province, latitude, longitude, start_date, description, streaming, private, food_provided, alcohol, parking, adult_only) VALUES (?,?,?,?,?,?,?,?,STR_TO_DATE(?,'%m-%d-%Y %H:%i:%s'),?,?, ?, ?, ?, ?, ?)";
		//console.log(query);
		//console.log(s_date);

		var query_params = [
			params.pname,
			user, //TODO: Find way to determine host ID 
			params.capacity, 
			params.address,
			params.city,
			params.province,
			params.latitude,
			params.longitude,
			s_date,
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
				//console.log(query_params[i] + ", " + i);
				query_params[i] = 0;
			}
		}
		if (params.uploaded_values != undefined) {
			var upload_extensions = params.uploaded_values.toString().split(',');
			var upload_query = "INSERT INTO uploads (extension, owner, picture_name) VALUES (?,?,?)";
		}
		var this_pid;
		
		function getPid(sql, callback) {
			mysql_conn.query(sql, function(error, results, fields) {
				if (error) {
				}
				if (results.length > 0) {
					console.log(results);
					callback(results);
				}
			});
		} 
		
		getPid("SELECT MAX(id) AS pid FROM parties", function(results) {
			if (results != undefined)
				this_pid = results[0].pid;
			else this_pid = 0;
		});
		
		mysql_conn.query(query, query_params, function(err, result) {
			if (err) throw err;
			
			if (params.uploaded_values != undefined) {
				for (var i = 0; i < upload_extensions.length; i++) {
					var upload_query_params = [upload_extensions[i].split('.').pop(), user, (this_pid + 1) + "_" + (i + 1)]
					mysql_conn.query(upload_query, upload_query_params, function(err, result) {
						if (err) {
							console.log(err.message);
						}
					}.bind(mysql_conn, i));
				}
			}
			callback(result.insertId);
		});
	},
	
	completed: function(id, callback) {
		var query = "UPDATE parties SET ended = 1 WHERE id = ?";
		mysql_conn.query(query, id, function(err, result) {
			if (err) throw err;
			callback(result);
		});					
	},
	
	
	
	user: function(id, callback) {
		var query = "SELECT * FROM parties WHERE host = ?";
		var result = [];
		mysql_conn.query(query, [id], function(err, rows, fields) {
			//console.log(rows);
			if (err) throw err;
			var result = [];
			for (i=0; i < rows.length; i++) {
				var data = [];
				data.push(rows[i].start_date);				
				data.push(rows[i].name);
				data.push(rows[i].id);
				result.push(data);
			}
			callback(result);
		});
	}
};
