const { Pool } = require("pg");
require("dotenv").config()

console.log(process.env.DATABASE)

const pool = new Pool({
  user: process.env.DB_USERNAME || "postgres",
  database: process.env.DATABASE,
  password: process.env.DB_PASSWORD,
  port: 5432,
  host: process.env.DB_HOST,
});

module.exports = { pool };
