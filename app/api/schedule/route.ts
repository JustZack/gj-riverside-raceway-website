import Schedule from '@/lib/db/schedule'
import Responses from '@/lib/api/responses'

export async function GET() {
  const schedules = await Schedule.getTrackSchedule()
  return Responses.ok(schedules)
}