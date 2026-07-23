import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

function getUrl(): string {
  if (process.env.DATABASE_URL) {
    return process.env.DATABASE_URL;
  }
  if (process.env.VERCEL || process.env.NODE_ENV === "production") {
    console.error("CRITICAL ERROR: DATABASE_URL is missing in environment variables!");
  }
  return "file:./ecommerce.db";
}

const adapter = new PrismaLibSql({
  url: getUrl(),
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
