import API from "@/lib/api/api"
import { Event } from "react-big-calendar"
import { livetime } from "@/content/content"
export default class TrackScheduleUtils {
    //Checks if the event was cancelled
    static eventIsCancelled(event: any): boolean {
        return event.cancelled === true
    }
    //Checks if the event has finished (based on end date)
    static eventIsFinished(event: any): boolean {
        const endDate = new Date(event.end)
        const today = new Date()
        // Zero out time for both dates
        endDate.setHours(0, 0, 0, 0)
        today.setHours(0, 0, 0, 0)
        return endDate < today
    }
    //Checks if the event is currently running (based on start and end date)
    static eventIsRunning(event: any): boolean {
        const now = new Date();
        // Start of tomorrow (midnight)
        let tomorrowAtMidnight = new Date();
        tomorrowAtMidnight.setDate(tomorrowAtMidnight.getDate() + 1);
        tomorrowAtMidnight.setHours(0, 0, 0, 0);
        const startDate = new Date(event.start);
        return now >= startDate && now < tomorrowAtMidnight;
    }
    //Checks if the event is happening today
    static eventIsToday(event: any): boolean {
        return (new Date()).toDateString() === (new Date(event.start)).toDateString()
    }
    //Checks if the event is upcoming (based on start date)
    static eventIsUpcoming(event: any): boolean {
        return new Date(event.start) > new Date()
    }

    static getEventStatus(event: ScheduleEvent): 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today' {
        if (this.eventIsCancelled(event))       return 'cancelled'
        else if (this.eventIsFinished(event))   return 'finished'
        else if (this.eventIsRunning(event))    return 'running'
        else if (this.eventIsToday(event))      return 'today'
        else                                    return 'upcoming'
    }

    static getEventStatusClassByName(status: 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today'): string {
        let base = `rounded min-w-[75px] flex items-center justify-center`
        if (status === 'cancelled')         return `${base} bg-red-100 text-red-800` 
        else if (status === 'finished')     return `${base} bg-green-100 text-green-800`
        else if (status === 'running')      return `${base} bg-checkerboard text-white font-bold text-outline-black `
        else if (status === 'today')        return `${base} bg-checkerboard text-white font-bold text-outline-black `
        else                                return `${base} bg-blue-100 text-blue-800`
    }

    static getEventStatusColorByName(status: 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today'): string {
        if (status === 'cancelled')         return '#ef4444' // red
        else if (status === 'finished')     return '#22c55e' // green
        else if (status === 'running')      return '#ffffff' // white
        else if (status === 'today')        return '#ffffff' // white
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

    static getTodaysScheduledEvent(setterCallback: (events: ScheduleEvent) => void, includeCancelled: boolean = false): void {
        API.getUpcomingSchedule(includeCancelled, 1).then((data) => {
            TrackScheduleUtils.formatAndSetEvents(data, (events: ScheduleEvent[]) => {
                console.log(events)
                let todaysEvent = events.filter(event => ['today', 'running'].includes(event.status));
                setterCallback(todaysEvent[0]);
            });
        });
    }
}

export interface ScheduleEvent extends Event {
    id: number
    title: string
    start: Date
    end: Date
    cancelled: boolean
    description?: string
    status: 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today'
    statusColor: string
    statusClass: string
    liveTimeId: number
    entries?: number
    drivers?: number
    laps?: number
    link: string | undefined
}