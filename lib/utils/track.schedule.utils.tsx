export default class TrackEventUtils {
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
}