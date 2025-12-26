import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  //Define / edit schedule types as needed
  const scheduleTypes = [
    { id: 1, name: 'Saturday Carpet Oval', description: 'Saturday Raceday on the carpet track!' },
    { id: 2, name: 'Tuesday Carpet Oval', description: 'Tuesday Raceday on the carpet track!' },
    { id: 3, name: 'Saturday Dirt Oval', description: 'Saturday Raceday on the dirt track!' },
    { id: 4, name: 'Tuesday Dirt Oval', description: 'Tuesday Raceday on the dirt track!' }
  ]

  console.log('Seeding schedule types...')
  
  for (const scheduleType of scheduleTypes) {
    await prisma.scheduleType.upsert({
      where: { id: scheduleType.id },
      update: {
        name: scheduleType.name,
        description: scheduleType.description,
      },
      create: scheduleType,
    })
  }

  console.log('Seeding completed!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })