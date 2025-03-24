import pkg from "pg";
const { Pool } = pkg;


const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "encava",
  password: "camilo01",
  port: 5432,
});

export default pool;
