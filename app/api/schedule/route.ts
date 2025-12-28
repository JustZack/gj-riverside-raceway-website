import Events from '@/lib/db/events'
import Responses from '@/lib/api/responses'
import ScrapeLiveTimeRCContentJob from '@/lib/jobs/scrape.livetimerc.content';

export async function GET() {
  const schedules = await Events.getMany()
  return Responses.ok(schedules)
}