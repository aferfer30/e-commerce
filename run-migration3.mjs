import { createClient } from "@libsql/client";
import fs from "fs";

const url = "libsql://aferfer30-aferfer30.aws-ap-northeast-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ4MzExNDMsImlkIjoiMDE5ZjkwMzEtNTcwMS03ZDJiLTg5M2QtNjEyNDdkYzU4ZDE4Iiwia2lkIjoiR3ViaGZ2SzVWa1NIUF9RWVBwVlJNLWYwVGNoZEViRUdIR20zOHV1bXdyYyIsInJpZCI6IjJkNTRlNmE5LTgwYjAtNDUxYS04YTU3LTdjYWE3YTcxZDQ4NCJ9.MaYZxE0jaCxoaDurTDHlI6XA7XIGwhkKvYXvwauj6uobKxa6f1WwrwBaggFi0JtIL03DD5mXtDVOkQvTFO34Dw";

const client = createClient({ url, authToken });

async function run() {
  let sql = fs.readFileSync("migrate.sql", "utf8");
  // Strip BOM
  if (sql.charCodeAt(0) === 0xFEFF) {
    sql = sql.slice(1);
  }
  // Remove comments just in case
  sql = sql.replace(/--.*$/gm, "").trim();
  
  try {
    await client.executeMultiple(sql);
    console.log("Migration complete!");
  } catch (e) {
    console.error("Error executing:", e);
  }
}

run();
