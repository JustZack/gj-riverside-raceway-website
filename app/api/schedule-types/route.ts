import { NextResponse } from 'next/server'
import Schedule from '@/lib/db/schedule'
import Responses from '@/lib/api/responses'

export async function GET() {
  const schedules = await Schedule.getTypes()
  return Responses.ok(schedules);
}