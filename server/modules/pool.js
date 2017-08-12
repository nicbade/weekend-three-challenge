var pg = require('pg');

var config = {
    database: 'tasks', //name of database
    host: 'localhost',
    port: 5432,
    max: 10,
    idleTimeoutMillis: 30000 // 30 seconds to try to connect
};

module.exports = pg.Pool(config);