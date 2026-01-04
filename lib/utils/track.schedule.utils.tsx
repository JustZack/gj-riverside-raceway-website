import API from "@/lib/api/api"
import { Event } from "react-big-calendar"
import { events, livetime } from "@/content/content"
import TimeUtils from "./time"
export default class TrackScheduleUtils {

    //Gets the event agenda information based on the event date
    static getEventAgendaByEvent(event: ScheduleEvent): any {
        let dayOfTheWeek = TimeUtils.getDayOfTheWeek(event.start, false);
        return events[dayOfTheWeek.toLowerCase() as keyof typeof events];
    }
    
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

    static getEventStatusText(event: ScheduleEvent): string {
        let status: string;
        let eventInfo = TrackScheduleUtils.getEventAgendaByEvent(event);
        //If the event is NOT running today. use the event name from the agenda or day of the week
        //  I.E. "Tuesday", "Saturday"
        if (!TrackScheduleUtils.eventIsToday(event)) status = eventInfo.name
        else {
            status = this.getEventStatus(event);
            status = status.charAt(0).toUpperCase() + status.slice(1); // Capitalize first letter
        }
        return status
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

    static getEventStatusIconByName(status: 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today'): string {
        if (status === 'cancelled')         return 'fa-solid fa-xmark-circle'
        else if (status === 'finished')     return 'fa-solid fa-check-circle'
        else if (status === 'running')      return 'fa-solid fa-forward'
        else if (status === 'today')        return 'fa-solid fa-calendar-check'
        else                                return 'fa-regular fa-calendar'
    }

    static getEventStatusClass(event: ScheduleEvent): string {
        let eventInfo = TrackScheduleUtils.getEventAgendaByEvent(event);
        //If the event is NOT running today. use the event class from the agenda
        //  I.E. use the tuesday or saturday class
        if (!TrackScheduleUtils.eventIsToday(event)) return eventInfo?.chipClass || ""
        else return this.getEventStatusClassByName(this.getEventStatus(event));
    }

    static getEventStatusColor(event: ScheduleEvent): string {
        return this.getEventStatusColorByName(this.getEventStatus(event));
    }

    static getEventStatusIcon(event: ScheduleEvent): string {
        return this.getEventStatusIconByName(this.getEventStatus(event));
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
            statusText: TrackScheduleUtils.getEventStatusText(event),
            statusColor: TrackScheduleUtils.getEventStatusColor(event),
            statusClass: TrackScheduleUtils.getEventStatusClass(event),
            statusIcon: TrackScheduleUtils.getEventStatusIcon(event),
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
    status: 'cancelled' | 'finished' | 'upcoming' | 'running' | 'today'
    statusText: string,
    statusColor: string
    statusClass: string
    statusIcon: string,
    liveTimeId: number
    entries?: number
    drivers?: number
    laps?: number
    link: string | undefined
}