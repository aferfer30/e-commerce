import { PrismaClient } from "./generated/prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

let dbUrl = process.env.DATABASE_URL;
if (!dbUrl || dbUrl === "undefined") {
  dbUrl = "file:./ecommerce.db";
}

const adapter = new PrismaLibSql({
  url: dbUrl,
});

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
