import { prisma } from './lib/prisma';
import bcrypt from 'bcryptjs';

async function main() {
  const pw = await bcrypt.hash('testtest', 10);
  await prisma.user.upsert({
    where: { email: 'test@test.com' },
    update: { role: 'ADMIN', password: pw },
    create: { email: 'test@test.com', name: 'Test Admin', role: 'ADMIN', password: pw }
  });
  console.log('Admin created');
}

main().catch(console.error).finally(() => prisma.$disconnect());
