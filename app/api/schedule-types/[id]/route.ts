import Events from '@/lib/db/events'
import Responses from '@/lib/api/responses'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id: idString } = await params
  const id = parseInt(idString)
  
  if (isNaN(id)) return Responses.badRequest('Invalid ID');
  
  const eventType = await Events.getTypeById(id)
  if (!eventType) return Responses.notFound('Event type not found');
  
  return Responses.ok(eventType)
}