import { prisma } from '@/lib/prisma'
import { SortOrder, EventTypeOrderBy, TrackEventOrderBy, TrackEventWithType } from './types'
import { EventType, TrackEvent, Prisma } from '@prisma/client'

export default class Events {
    //Event Type CRUD
    static async getTypes(sort: SortOrder = 'asc', orderBy: EventTypeOrderBy = 'id'): Promise<EventType[]> {
        return prisma.eventType.findMany({ orderBy: { [orderBy]: sort } })
    }
    static async getTypeById(id: number): Promise<EventType | null> {
        return prisma.eventType.findUnique({ where: { id } })
    }
    static async createType(data: Prisma.EventTypeCreateInput): Promise<EventType> {
        return prisma.eventType.create({ data })
    }
    static async updateType(id: number, data: Prisma.EventTypeUpdateInput): Promise<EventType> {
        return prisma.eventType.update({ where: { id }, data })
    }
    static async deleteType(id: number): Promise<EventType> {
        return prisma.eventType.delete({ where: { id } })
    }

    //Track Event CRUD
    static async getEvents(sort: SortOrder = 'asc', orderBy: TrackEventOrderBy = 'id', limit?: number, includeType: boolean = true): Promise<TrackEvent[] | TrackEventWithType[]> {
        return prisma.trackEvent.findMany({ 
            orderBy: { [orderBy]: sort }, 
            take: limit,
            include: includeType ? { type: true } : undefined
        })
    }
    static async getEventsByTypeId(typeId: number, sort: SortOrder = 'asc', orderBy: TrackEventOrderBy = 'id', limit?: number): Promise<TrackEventWithType[]> {
        return prisma.trackEvent.findMany({
            where: { typeId },
            orderBy: { [orderBy]: sort },
            take: limit,
            include: { type: true }
        })
    }
    static async getEventById(id: number, includeType: boolean = true): Promise<TrackEvent | TrackEventWithType | null> {
        return prisma.trackEvent.findUnique({ 
            where: { id },
            include: includeType ? { type: true } : undefined
        })
    }
    static async createEvent(data: Prisma.TrackEventCreateInput): Promise<TrackEvent> {
        return prisma.trackEvent.create({ data })
    }
    static async updateEvent(id: number, data: Prisma.TrackEventUpdateInput): Promise<TrackEvent> {
        return prisma.trackEvent.update({ where: { id }, data })
    }
    static async deleteEvent(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.delete({ where: { id } })
    }

    //Business Logic for events
    static async getUpcomingEvents(limit?: number): Promise<TrackEventWithType[]> {
        return prisma.trackEvent.findMany({
            where: {
                start: { gte: new Date() },
                visible: true,
                cancelled: false
            },
            orderBy: { start: 'asc' },
            take: limit,
            include: { type: true }
        })
    }
    static async getVisibleEvents(sort: SortOrder = 'asc', orderBy: TrackEventOrderBy = 'start'): Promise<TrackEventWithType[]> {
        return prisma.trackEvent.findMany({
            where: { visible: true, cancelled: false },
            orderBy: { [orderBy]: sort },
            include: { type: true }
        })
    }
    static async cancelEvent(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.update({
            where: { id },
            data: { cancelled: true }
        })
    }
    static async uncancelEvent(id: number): Promise<TrackEvent> {
        return prisma.trackEvent.update({
            where: { id },
            data: { cancelled: false }
        })
    }
}


