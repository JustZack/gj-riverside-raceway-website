import { prisma } from '@/lib/prisma'
import { SortOrder, TrackEventOrderBy, TrackEventWithLiveTime } from './types'
import { TrackEvent, LiveTimeEvent, Prisma } from '@prisma/client'

export default class Events {
    //Track Event CRUD
    static async getMany(sort: SortOrder = 'desc', orderBy: TrackEventOrderBy = 'start', limit?: number, includeType: boolean = true): Promise<TrackEvent[] | TrackEventWithLiveTime[]> {
        return prisma.trackEvent.findMany({ 
            orderBy: { [orderBy]: sort }, 
            take: limit,
            include: includeType ? { liveTimeEvent: true } : undefined
        })
    }
    static async getById(id: number, includeType: boolean = true): Promise<TrackEvent | TrackEventWithLiveTime | null> {
        return prisma.trackEvent.findUnique({ 
            where: { id },
            include: includeType ? { liveTimeEvent: true } : undefined
        })
    }
    static async create(data: Prisma.TrackEventCreateInput): Promise<TrackEvent> {
        return prisma.trackEvent.create({ data })
    }
    static async update(id: number, data: Prisma.TrackEventUpdateInput): Promise<TrackEvent> {
        return prisma.trackEvent.update({ where: { id }, data })
    }
    static async delete(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.delete({ where: { id } })
    }

    //Business Logic for events
    static async getUpcoming(limit?: number): Promise<TrackEventWithLiveTime[]> {
        return prisma.trackEvent.findMany({
            where: {
                start: { gte: new Date() },
                visible: true,
                cancelled: false
            },
            orderBy: { start: 'desc' },
            take: limit,
            include: { liveTimeEvent: true }
        })
    }
    static async getVisible(sort: SortOrder = 'desc', orderBy: TrackEventOrderBy = 'start'): Promise<TrackEventWithLiveTime[]> {
        return prisma.trackEvent.findMany({
            where: { visible: true, cancelled: false },
            orderBy: { [orderBy]: sort },
            include: { liveTimeEvent: true }
        })
    }
    static async getCancelled(sort: SortOrder = 'desc', orderBy: TrackEventOrderBy = 'start'): Promise<TrackEventWithLiveTime[]> {
        return prisma.trackEvent.findMany({
            where: { cancelled: true },
            orderBy: { [orderBy]: sort },
            include: { liveTimeEvent: true }
        })
    }

    static async cancel(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.update({
            where: { id },
            data: { cancelled: true }
        })
    }
    static async uncancel(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.update({
            where: { id },
            data: { cancelled: false }
        })
    }
}


