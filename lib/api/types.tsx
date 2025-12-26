// Types for API responses

// Schedule Type
export type ScheduleType = {
  id: number
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

// Track Schedule
export type TrackSchedule = {
  id: number
  typeId: number
  start: Date
  end: Date
  name: string
  description?: string
  visible: boolean
  createdAt: Date
  updatedAt: Date
}