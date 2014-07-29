var path = require('path');
var permanent_upload_dir = '../public/uploads';

//Asynchronous file copying 
function copyFile(source, target, cb) {
  var cbCalled = false;

  var rd = fs.createReadStream(source);
  rd.on("error", done);

  var wr = fs.createWriteStream(target);
  wr.on("error", done);
  wr.on("close", function(ex) {
    done();
  });
  rd.pipe(wr);

  function done(err) {
    if (!cbCalled) {
      cb(err);
      cbCalled = true;
    }
  }
}

module.exports = function(db, cb) {
	db.define("upload", {
		'id': { type: 'integer' },
		'posted_date': { type: 'date' },
		'extension': { type: 'text' }
	},
	{
		'collection': 'uploads',
		'methods' : {
			createFromUpload: function(file_name, callback) {
				db.models.upload.create({
					'extension': path.extname(file_name)
				}, function(err, results) {
					if (!err && results[0]) {
						copyFile(file_name, permanent_upload_dir + '/' + results[0].id, function(err) {
							callback(err, results[0]);
						});
					}
					else {
						callback(err, results);
					}
				});
			}
		}
	});
	return cb();
};