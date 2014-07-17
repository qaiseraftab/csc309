var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(query, callback) {
		console.log(query);	
		var strQuery = 'select *, ((p.location like "%' + query + 
					'%") + (p.capacity like "%' + query + '%") + (p.name like "%' + 
					query + '%") + (p.description like "%' + query + 
					'%")) as hits from parties p having hits > 0';
	mysql_conn.query(strQuery, function(err, rows, fields) {
			if (err) throw err;
			console.log(fields);
			var result = [];
			for (i=0; i < rows.length; i++) {
				var data = [];
				data.push(rows[i].name);
				data.push(rows[i].start_date);
				data.push(rows[i].location);
				data.push(rows[i].capacity.toString());
				data.push(rows[i].description);
				data.push(rows[i].id);
				result.push(data);
			}
			console.log(result);
			callback(result);
		});
	}
};
