import Events from '@/lib/db/events'
import Responses from '@/lib/api/responses'

export async function GET() {
  const eventTypes = await Events.getTypes()
  return Responses.ok(eventTypes);
}