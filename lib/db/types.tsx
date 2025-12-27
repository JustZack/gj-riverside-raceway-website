//Bunch of different types to help with database queries.
//  Use prisma generated types where possible.

import { Prisma } from "@prisma/client"

//Sort order type
export type SortOrder = 'asc' | 'desc'

//Possible fields to order EventType by
export type EventTypeOrderBy = 'id' | 'name' | 'createdAt' | 'updatedAt'
//Possible fields to order TrackEvent by
export type TrackEventOrderBy = 'id' | 'typeId' | 'name' | 'createdAt' | 'updatedAt' | 'start' | 'end'

// Type for event with its type relation included
export type TrackEventWithType = Prisma.TrackEventGetPayload<{
    include: { type: true }
}>