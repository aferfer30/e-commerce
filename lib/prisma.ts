import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function getLibSqlConfig() {
  const envUrl = process.env.DATABASE_URL;
  const isLocal = !process.env.VERCEL && process.env.NODE_ENV !== "production" && (!envUrl || envUrl.includes("file:"));

  if (isLocal) {
    return { url: "file:./ecommerce.db" };
  }

  const rawUrl = (envUrl && !envUrl.includes("file:") && !envUrl.includes("ecommerce.db"))
    ? envUrl
    : "libsql://aferfer30-aferfer30.aws-ap-northeast-1.turso.io?authToken=eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODQ4MzExNDMsImlkIjoiMDE5ZjkwMzEtNTcwMS03ZDJiLTg5M2QtNjEyNDdkYzU4ZDE4Iiwia2lkIjoiR3ViaGZ2SzVWa1NIUF9RWVBwVlJNLWYwVGNoZEViRUdIR20zOHV1bXdyYyIsInJpZCI6IjJkNTRlNmE5LTgwYjAtNDUxYS04YTU3LTdjYWE3YTcxZDQ4NCJ9.MaYZxE0jaCxoaDurTDHlI6XA7XIGwhkKvYXvwauj6uobKxa6f1WwrwBaggFi0JtIL03DD5mXtDVOkQvTFO34Dw";

  if (rawUrl.includes("?authToken=")) {
    const [url, authToken] = rawUrl.split("?authToken=");
    return { url, authToken };
  }

  return { url: rawUrl };
}

const adapter = new PrismaLibSql(getLibSqlConfig());

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma =
  process.env.NODE_ENV === "production"
    ? new PrismaClient({ adapter })
    : globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
