module.exports = function(db, cb) {
	require("fs").readdirSync("./orm_models").forEach(function(file) {
		if (file != "__models__.js" && file != "__associations__.js" && file.slice(-3) == ".js") {
			db.load("./" + file, function(err) {
				if (err) {
					console.log("Failed to load ORM model " + file);
					throw err;
				}
				else {
					console.log("Loaded ORM model " + file);
				}
			});
		}
	});
	return cb();
};