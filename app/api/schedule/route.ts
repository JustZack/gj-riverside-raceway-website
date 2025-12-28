import Events from '@/lib/db/events'
import Responses from '@/lib/api/responses'
import ScrapeLiveTimeRCContentJob from '@/lib/jobs/sync.livetimerc.content.job';

export async function GET() {
  const schedules = await Events.getMany()
  return Responses.ok(schedules)
}