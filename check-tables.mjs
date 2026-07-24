import { createClient } from "@libsql/client";

const url = "libsql://aferfer30-aferfer30.aws-ap-northeast-1.turso.io";
const authToken = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ4MzExNDMsImlkIjoiMDE5ZjkwMzEtNTcwMS03ZDJiLTg5M2QtNjEyNDdkYzU4ZDE4Iiwia2lkIjoiR3ViaGZ2SzVWa1NIUF9RWVBwVlJNLWYwVGNoZEViRUdIR20zOHV1bXdyYyIsInJpZCI6IjJkNTRlNmE5LTgwYjAtNDUxYS04YTU3LTdjYWE3YTcxZDQ4NCJ9.MaYZxE0jaCxoaDurTDHlI6XA7XIGwhkKvYXvwauj6uobKxa6f1WwrwBaggFi0JtIL03DD5mXtDVOkQvTFO34Dw";

const client = createClient({ url, authToken });

async function run() {
  try {
    const res = await client.execute("SELECT name FROM sqlite_master WHERE type='table'");
    console.log("Connected successfully! Tables:", res.rows);
  } catch (e) {
    console.error("Error executing:", e);
  }
}

run();
