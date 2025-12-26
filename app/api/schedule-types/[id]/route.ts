import Responses from '@/lib/api/responses'
import Schedule from '@/lib/db/schedule'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params
  const id = parseInt(idString)
  
  if (isNaN(id)) return Responses.badRequest('Invalid ID');
  
  const scheduleType = await Schedule.getTypeById(id)
  if (!scheduleType) return Responses.notFound('Schedule not found');
  
  return Responses.ok(scheduleType)
}