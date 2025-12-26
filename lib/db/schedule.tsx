import { prisma } from '@/lib/prisma'
import { SortOrder, ScheduleTypeOrderBy, TrackScheduleOrderBy } from './types'

export default class Schedule {
    static async getTypes(sort: SortOrder = 'asc', orderBy: ScheduleTypeOrderBy = 'id') {
        return prisma.scheduleType.findMany({ orderBy: { [orderBy]: sort } })
    }

    static async getTypeById(id: number) {
        return prisma.scheduleType.findUnique({ where: { id } })
    }

    static async getTrackSchedule(sort: SortOrder = 'asc', orderBy: TrackScheduleOrderBy = 'id', limit?: number) {
        return prisma.trackSchedule.findMany({ orderBy: { [orderBy]: sort }, take: limit })
    }

    static async getTrackSchedulesByTypeId(typeId: number, sort: SortOrder = 'asc', orderBy: TrackScheduleOrderBy = 'id') {
        return prisma.trackSchedule.findMany({
            where: { typeId },
            orderBy: { [orderBy]: sort }
        })
    }

    static async getTrackScheduleById(id: number) {
        return prisma.trackSchedule.findUnique({ where: { id } })
    }
}


