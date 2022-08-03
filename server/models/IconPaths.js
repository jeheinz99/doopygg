const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.PG_URI
});

// PostGresQL DB to store Icon Paths
module.exports = {
    query: (text, params, callback) => {
        console.log('executed query', text);
        return pool.query(text, params, callback);
    }
};