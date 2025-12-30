import API from "@/lib/api/api"
import { Event } from "react-big-calendar"
import { livetime } from "@/content/content"
export default class TrackScheduleUtils {
    static eventIsCancelled(event: any): boolean {
        return event.cancelled === true
    }
    static eventIsFinished(event: any): boolean {
        return new Date(event.end) < new Date()
    }
    static eventIsRunning(event: any): boolean {
        return new Date(event.start) <= new Date() && new Date(event.end) >= new Date()
    }
    static eventIsUpcoming(event: any): boolean {
        return new Date(event.start) > new Date()
    }

    static getEventStatus(event: ScheduleEvent): 'cancelled' | 'finished' | 'upcoming' | 'running' {
        if (this.eventIsCancelled(event))       return 'cancelled'
        else if (this.eventIsFinished(event))   return 'finished'
        else if (this.eventIsRunning(event))    return 'running'
        else                                    return 'upcoming'
    }

    static getEventStatusClassByName(status: 'cancelled' | 'finished' | 'upcoming' | 'running'): string {
        let base = `rounded text-sm min-w-[90px] flex items-center justify-center`
        if (status === 'cancelled')         return `${base} bg-red-100 text-red-800` 
        else if (status === 'finished')     return `${base} bg-green-100 text-green-800`
        else if (status === 'running')      return `${base} bg-gray-300 text-gray-900`
        else                                return `${base} bg-blue-100 text-blue-800`
    }

    static getEventStatusColorByName(status: 'cancelled' | 'finished' | 'upcoming' | 'running'): string {
        if (status === 'cancelled')         return '#ef4444' // red
        else if (status === 'finished')     return '#22c55e' // green
        else if (status === 'running')      return '#6b7280' // gray
        else                                return '#3b82f6' // blue
    }

    static getEventStatusClass(event: ScheduleEvent): string {
        return this.getEventStatusClassByName(this.getEventStatus(event));
    }

    static getEventStatusColor(event: ScheduleEvent): string {
        return this.getEventStatusColorByName(this.getEventStatus(event));
    }

    static formatEvents(rawEvents: any[]): ScheduleEvent[] {
        return rawEvents.map((event: any) => ({
            id: event.id,
            title: event.name,
            start: new Date(event.start),
            end: new Date(event.end),
            cancelled: event.cancelled,
            description: event.description,
            status: TrackScheduleUtils.getEventStatus(event),
            statusColor: TrackScheduleUtils.getEventStatusColor(event),
            statusClass: TrackScheduleUtils.getEventStatusClass(event),
            ...event.liveTimeEvent,
            link: event.livetimeID ? livetime.getResultLink(event.livetimeID) : undefined,
        }))
    }

    static formatAndSetEvents(rawEvents: any[], setterCallback: (events: ScheduleEvent[]) => void): ScheduleEvent[] {
        const events = TrackScheduleUtils.formatEvents(rawEvents);
        setterCallback(events);
        return events;
    }

    static getAllScheduleEvents(setterCallback: (events: ScheduleEvent[]) => void): void {
        API.getSchedule().then((data) => {
            TrackScheduleUtils.formatAndSetEvents(data, setterCallback);
        })
    }

    static getUpcomingScheduleEvents(setterCallback: (events: ScheduleEvent[]) => void, includeCancelled: boolean = false, limit: number = 4): void {
        API.getUpcomingSchedule(includeCancelled, limit).then((data) => {
            TrackScheduleUtils.formatAndSetEvents(data, setterCallback);
        })
    }
}

export interface ScheduleEvent extends Event {
    id: number
    title: string
    start: Date
    end: Date
    cancelled: boolean
    description?: string
    status: 'cancelled' | 'finished' | 'upcoming' | 'running'
    statusColor: string
    statusClass: string
    liveTimeId: number
    entries?: number
    drivers?: number
    laps?: number
    link: string | undefined
}