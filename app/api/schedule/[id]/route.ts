import Responses from '@/lib/api/responses'
import Schedule from '@/lib/db/schedule'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = parseInt(params.id)
  if (isNaN(id)) return Responses.badRequest('Invalid ID');
  
  const scheduleType = await Schedule.getTrackScheduleById(id)
  if (!scheduleType) return Responses.notFound('Schedule not found');
  return Responses.ok(scheduleType)
}