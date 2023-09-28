import { PrismaClient } from '@prisma/client'
import { hash } from 'bcrypt'

const prisma = new PrismaClient()

async function main() {
    const password = await hash('1234', 12)
    const user = await prisma.user.upsert({
        where: { email: '1234@test.com' },
        update: {},
        create: {
            email: '1234@test.com',
            name: 'Test User',
            password
        }
    })
    console.log({ user })
}
main()
    .then(() => prisma.$disconnect())
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })