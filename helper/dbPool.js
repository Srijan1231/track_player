import dotenv from "dotenv";
dotenv.config();
import pg from "pg";
const { Pool } = pg;
// Initialize a connection pool using environment variables
const postgresUrl = process.env.POSTGRES_URL;
if (!postgresUrl) {
  throw Error("Missing Postgres Url");
}
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});

export const query = (text, params) => pool.query(text, params);

export default pool;
