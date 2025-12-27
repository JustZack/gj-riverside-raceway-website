import { PrismaClient } from '@prisma/client'
import SeedData from './seed.data.json'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting seeding process...')

  //Be careful with this - it will delete existing data.
  await clearDatabase();

  await seedLiveTimeEvent(SeedData.LiveTimeEvent)
  await seedEvents(SeedData.TrackEvents)

  console.log('Seeding completed!')
}

async function clearDatabase() {
  console.log('Clearing database...')
  await prisma.trackEvent.deleteMany({})
  await prisma.liveTimeEvent.deleteMany({})
  console.log('Database cleared.')
}

async function seedLiveTimeEvent(liveTimeEvents: any[]) {
  console.log('Seeding LiveTimeEvent...')

  for (const liveTimeEvent of liveTimeEvents) {
    await prisma.liveTimeEvent.upsert({
      where: { id: liveTimeEvent.id },
      update: { 
        name: liveTimeEvent.name, startedAt: liveTimeEvent.startedAt,
        entries: liveTimeEvent.entries, drivers: liveTimeEvent.drivers },
      create: { ...liveTimeEvent },
    })
    console.log(`Seeded LiveTimeEvent: ${liveTimeEvent.name} (id=${liveTimeEvent.id})`)
  }
  console.log(`Seeded ${liveTimeEvents.length} LiveTimeEvents.`)
}

//Seeding events is more important for initial data & development
//  Be careful when running in production as it will overwrite existing data
async function seedEvents(events: any[]) {
  console.log('Seeding Events...')
  
  for (const event of events) {
    await prisma.trackEvent.upsert({
      where: { livetimeID: event.livetimeID },
      update: {
        name: event.name
      }, 
      create: {
        ...event,
        start: new Date(event.start),
        end: new Date(event.end),
      }
    })
    console.log(`Seeded TrackEvent: ${event.name} (id=${event.livetimeID})`)
  }
  console.log(`Seeded ${events.length} TrackEvents.`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })