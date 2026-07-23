import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const HARDCODED_TURSO_URL = "https://aferfer30-aferfer30.aws-ap-northeast-1.turso.io";
const HARDCODED_TURSO_TOKEN = "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ4MzExNDMsImlkIjoiMDE5ZjkwMzEtNTcwMS03ZDJiLTg5M2QtNjEyNDdkYzU4ZDE4Iiwia2lkIjoiR3ViaGZ2SzVWa1NIUF9RWVBwVlJNLWYwVGNoZEViRUdIR20zOHV1bXdyYyIsInJpZCI6IjJkNTRlNmE5LTgwYjAtNDUxYS04YTU3LTdjYWE3YTcxZDQ4NCJ9.MaYZxE0jaCxoaDurTDHlI6XA7XIGwhkKvYXvwauj6uobKxa6f1WwrwBaggFi0JtIL03DD5mXtDVOkQvTFO34Dw";

function getLibSqlConfig() {
  const envUrl = process.env.DATABASE_URL;
  const isLocal = !process.env.VERCEL && process.env.NODE_ENV !== "production" && (!envUrl || envUrl.includes("file:"));

  if (isLocal) {
    return { url: "file:./ecommerce.db" };
  }

  let url = HARDCODED_TURSO_URL;
  let authToken = HARDCODED_TURSO_TOKEN;

  if (envUrl && !envUrl.includes("file:") && !envUrl.includes("ecommerce.db")) {
    let cleanUrl = envUrl.replace("libsql://", "https://");
    if (cleanUrl.includes("?authToken=")) {
      const parts = cleanUrl.split("?authToken=");
      url = parts[0];
      authToken = parts[1];
    } else {
      url = cleanUrl;
      if (process.env.TURSO_AUTH_TOKEN) {
        authToken = process.env.TURSO_AUTH_TOKEN;
      }
    }
  }

  return { url, authToken };
}

const adapter = new PrismaLibSql(getLibSqlConfig());

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
