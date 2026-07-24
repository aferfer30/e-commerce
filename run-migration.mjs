import { createClient } from "@libsql/client";
import fs from "fs";

const url = "libsql://aferfer30-aferfer30.aws-ap-northeast-1.turso.io";
const authToken = "ebqoKFejJWlHipHkV/IhtcrjDanhNzMOA2hQ8dTytoUD";

const client = createClient({
  url: url,
  authToken: authToken,
});

async function run() {
  const sql = fs.readFileSync("migrate.sql", "utf8");
  const statements = sql.split(";").map(s => s.trim()).filter(s => s.length > 0);
  
  for (const statement of statements) {
    try {
      await client.execute(statement);
    } catch (e) {
      console.error("Error executing:", statement);
      console.error(e);
    }
  }
  console.log("Migration complete!");
}

run();
