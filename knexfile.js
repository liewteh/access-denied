// Update with your config settings.
require("dotenv").config();

module.exports = {
  development: {
    client: "postgresql",
    connection: {
      user: process.env.DB_USER,
      database: "cyf",
      password: process.env.DB_PASS,
      port: 5432,
    },
    migrations: {
      directory: __dirname + "/server/db/migrations",
    },
    seeds: {
      directory: __dirname + "/server/db/seeds",
    },
  },

  production: {
    client: "postgresql",
    connection: {
      connectionString: process.env.DATABASE_URL,
      connectionTimeoutMillis: 5000,
      ssl: {
        rejectUnauthorized: false,
      },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      directory: __dirname + "/server/db/migrations",
    },
    seeds: {
      directory: __dirname + "/server/db/seeds",
    },
  },
};
