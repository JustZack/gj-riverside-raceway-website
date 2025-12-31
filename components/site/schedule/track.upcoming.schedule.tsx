'use client'
import { useState, useEffect, useCallback } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import Row from '@/components/ui/row'
import Card from '@/components/ui/card'
import { about } from '@/content/content';
import Column from '@/components/ui/column'

export default function TrackUpcomingSchedule({className, style, width = "500px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    const [events, setEvents] = useState<ScheduleEvent[]>([])
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, setEvents, true, 4), [])

    function eventRow(icon: string, dayOfTheWeek: string, startDate: string, startTime: string, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let statusClass = TrackScheduleUtils.getEventStatusClassByName(status);
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={`${icon}`}/></span>
                <span className={`${statusClass} flex items-center justify-center w-min`}>{status}</span>
                <span className="flex items-center justify-start w-min min-w-[40px]">{dayOfTheWeek}</span>
                <span className="flex items-center justify-start w-min whitespace-nowrap">{startDate} {startTime}</span>
            </Row>
        )
    }

    const dayMap: Record<string, string> = { Mon: 'Mon', Tue: 'Tues', Wed: 'Wed', Thu: 'Thurs', Fri: 'Fri', Sat: 'Sat', Sun: 'Sun', };

    function formatEventRow(type: 'indoor' | 'outdoor', start: Date, end: Date, name: string, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let dayOfTheWeek = dayMap[format(start, 'EEE')]
        let startDate = format(start, 'MMM dd, yyyy')
        let startTime = format(start, 'h:mma').toLocaleLowerCase()
        return eventRow("fa-regular fa-calendar", dayOfTheWeek, startDate, startTime, status)
    }

    function formatEvent(event: ScheduleEvent) {
        return formatEventRow('indoor', event.start, event.end, event.title, event.status)
    }

    return (
        <Column className={className} style={{maxWidth: width, ...style}}>
            <div key="events-header">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <h1 className="text-2xl font-bold text-center underline"><i>Upcoming Events</i></h1>
                </Row>
            </div>
            <div key="events-practice">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <span className="flex items-center justify-center w-6 h-6"><i className="fa-solid fa-phone"/></span>
                    Call <a href={about.phoneUrl} className="text-blue-600 hover:underline">{about.phone}</a> for practice.
                </Row>
            </div>
            {events.length === 0 && (
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <span className="flex items-center justify-center w-6 h-6"><i className="fa-regular fa-calendar"/></span>
                    <span>No upcoming events.</span>
                </Row>
            )}
            {events.map((event) => (
                <div key={event.id}>
                    {formatEvent(event)}
                </div>
            ))}
        </Column>
    )
}
