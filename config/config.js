module.exports = {
    development: {
        dialect:  "postgres",
        username: "cruzinshtern",
        password: "user",
        database: "todosdb",
        port: 5432,
        host: "127.0.0.1"
    },
    test: {
        dialect:  "postgres",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
    },
    production: {
        dialect:  "postgres",
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT,
        host: process.env.DB_HOST
    }
}



