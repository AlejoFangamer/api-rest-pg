import pg from "pg";

export const pool = new pg.Pool({
  host: "localhost",
  port: 5432,
  database: "To-Do-DB",
  user: "postgres",
  password: "s0p0rt3" 
})