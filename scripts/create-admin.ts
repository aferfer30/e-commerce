import { prisma } from '../lib/prisma'
import bcrypt from 'bcryptjs'

async function main() {
  const email = 'test@test.com'
  const password = '00000000'
  const role = 'ADMIN'

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.upsert({
    where: { email },
    update: {
      password: hashedPassword,
      role: role,
    },
    create: {
      email,
      name: 'Test Admin',
      password: hashedPassword,
      role: role,
    },
  })

  console.log(`User created/updated: ${user.email} with role ${user.role}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
