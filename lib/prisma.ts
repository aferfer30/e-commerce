import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

// Safely access env var to avoid Next.js Turbopack stringification bugs during build
const dbUrl = (typeof process !== "undefined" && process.env.DATABASE_URL) 
  ? process.env.DATABASE_URL 
  : "file:./ecommerce.db";

const adapter = new PrismaLibSql({
  url: dbUrl,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
