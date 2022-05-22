const db_config = {
    client: 'pg',
    connection: process.env.PG_CONNECTION_STRING,

}

module.exports = db_config;