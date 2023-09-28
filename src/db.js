import pg from "pg";

export const pool = new pg.Pool({
  host: "ep-summer-dew-35352120.ap-southeast-1.aws.neon.fl0.io",
  port: 5432,
  database: "blog-db",
  user: "fl0user",
  password: "b4rxZUJ7snuP",
  ssl: {
    rejectUnauthorized: false,
  }
})