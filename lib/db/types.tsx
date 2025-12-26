//Bunch of different types used for database queries

export type SortOrder = 'asc' | 'desc'

//Possible fields to order ScheduleType by
export type ScheduleTypeOrderBy = 'id' | 'name' | 'createdAt' | 'updatedAt'
//Possible fields to order TrackSchedule by
export type TrackScheduleOrderBy = 'id' | 'typeId' | 'name' | 'createdAt' | 'updatedAt' | 'start' | 'end'