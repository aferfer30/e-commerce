import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";
import path from "path";

// Hardcoded to avoid Turbopack env variable stringification quirks
// Using process.cwd() ensures the file is found relative to the project root in Vercel Serverless
const adapter = new PrismaLibSql({
  url: `file:${path.join(process.cwd(), "ecommerce.db")}`,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
