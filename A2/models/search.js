var mysql_conn = require('./__mysql_connector__');

module.exports = {
	find: function(query, num, id, callback) {
		var strQuery = 'select *, ((p.address like "%' + query +
				'%") + (p.capacity like "%' + query + '%") + (p.name like "%' +
				query + '%") + (p.description like "%' + query +
				'%")) as hits from parties p where p.id != ' +
				id + ' having hits > 0 order by hits desc limit ' + num;

		/* Did not work due to using LIKE 
		var strQuery = "select *, ((p.address like \"%?%\") + (p.capacity like \"%?%\") + \
				(p.name like \"%?%\") + (p.description like \"%?%\")) as hits \
				from parties p where p.id != ? \
				having hits > 0 order by hits desc limit ?";
		var queryParam = [query, query, query, query, id, num];
		console.log(strQuery);
		console.log(queryParam); */
		mysql_conn.query(strQuery, function(err, rows, fields) {
			if (err) throw err;
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
			callback(result);
		});
	}
};
