import API from "@/lib/api/api"
import { Event } from "react-big-calendar"
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

    static getEventStatus(event: any): 'cancelled' | 'finished' | 'upcoming' | 'running' {
        if (this.eventIsCancelled(event))       return 'cancelled'
        else if (this.eventIsFinished(event))   return 'finished'
        else if (this.eventIsRunning(event))    return 'running'
        else                                    return 'upcoming'
    }

    static getEventStatusClass(event: any): string {
        if (this.eventIsCancelled(event))       return 'bg-red-100 text-red-800'
        else if (this.eventIsFinished(event))   return 'bg-green-100 text-green-800'
        else if (this.eventIsRunning(event))    return 'bg-gray-300 text-gray-900'
        else                                    return 'bg-blue-100 text-blue-800'
    }

    static getEventStatusColor(event: any): string {
        if (this.eventIsCancelled(event))       return '#ef4444' // red
        else if (this.eventIsFinished(event))   return '#22c55e' // green
        else if (this.eventIsRunning(event))    return '#6b7280' // gray
        else                                    return '#3b82f6' // blue
    }

    static getEventLiveTimeLink(event: any): string | undefined {
        if (event.liveTimeEvent) {
            return `https://jjsraceway.liverc.com/results/?p=view_event&id=${event.liveTimeEvent.id}`
        }
        return undefined
    }

    static fetchEvents(formatAndSetCallback: (events: any[]) => void): void {
        API.getSchedule().then(formatAndSetCallback).catch((error) => {
            console.error('Error fetching schedule data:', error)
        });
    }

    static fetchAndFormatEvents(setterCallback: (events: ScheduleEvent[]) => void): void {
        TrackScheduleUtils.fetchEvents((data) => {
          const formattedEvents: ScheduleEvent[] = data.map((event: any) => ({
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
            link: TrackScheduleUtils.getEventLiveTimeLink(event)
          }))
          setterCallback(formattedEvents)
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