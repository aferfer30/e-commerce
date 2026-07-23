const { PrismaClient } = require('./lib/generated/prisma');
const { hash } = require('bcryptjs');
const prisma = new PrismaClient();

async function main() {
  const pw = await hash('testtest', 10);
  await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: { role: 'ADMIN', password: pw },
    create: { email: 'test@test.com', name: 'Test Admin', role: 'ADMIN', password: pw }
  });
  console.log('Admin created');
}

main().catch(console.error).finally(() => prisma.$disconnect());
