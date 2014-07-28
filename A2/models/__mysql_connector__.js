var mysql = require('mysql');
var mysql_conn = mysql.createConnection(require('../config.json'));

module.exports = mysql_conn;