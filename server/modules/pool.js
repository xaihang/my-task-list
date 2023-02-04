const pg = require('pg');

const pool = new pg.Pool({
    // the name of the database (songs)
    database: 'weekend-to-do-app',
    // the location of our database, within the network
    host: 'localhost',
    // the port number to listen to -- 5432 is the default port
    port: 5432, 
})

module.exports = pool; 

