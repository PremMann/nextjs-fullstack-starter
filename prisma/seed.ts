import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  const password = await hash(process.env.ADMIN_PASSWORD || 'admin123', 12)

  const admin = await prisma.user.upsert({
    where: { email: process.env.ADMIN_EMAIL || 'admin@example.com' },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || 'admin@example.com',
      name: 'Admin User',
      password,
      role: 'ADMIN',
      emailVerified: new Date(),
    },
  })

  const testUser = await prisma.user.upsert({
    where: { email: 'user@example.com' },
    update: {},
    create: {
      email: 'user@example.com',
      name: 'Test User',
      password,
      role: 'USER',
      emailVerified: new Date(),
    },
  })

  console.log('✅ Database seeded successfully')
  console.log('Admin:', { email: admin.email, role: admin.role })
  console.log('User:', { email: testUser.email, role: testUser.role })
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
