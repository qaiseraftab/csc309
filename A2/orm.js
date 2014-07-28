var orm = require("orm");
var configs = require('./config.json');

var orm_db = orm.connect("mysql://" + configs.user + ":" + configs.password + "@" + configs.host + "/" + configs.database);

module.exports = orm_db;