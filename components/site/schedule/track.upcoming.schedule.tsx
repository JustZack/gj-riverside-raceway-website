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

export default function TrackUpcomingSchedule() {
    const [events, setEvents] = useState<ScheduleEvent[]>([])
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, setEvents, true, 4), [])

    function eventRow(icon: string, dayOfTheWeek: string, startDate: string, startTime: string, endTime: string, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let statusClass = TrackScheduleUtils.getEventStatusClassByName(status);
        return (
            <Row>
                <i className={`${icon} mr-2`} />
                <span className={statusClass}>{status}</span>
                <span className="min-w-[90px]">{dayOfTheWeek}</span>
                <span>{startDate} {startTime} - {endTime}</span>
            </Row>
        )
    }

    function formatEventRow(type: 'indoor' | 'outdoor', start: Date, end: Date, name: string, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let dayOfTheWeek = format(start, 'EEEE')
        let startDate = format(start, 'MMM dd, yyyy')
        let startTime = format(start, 'h a')
        let endTime = format(end, 'h a')
        return eventRow("fa-solid fa-calendar", dayOfTheWeek, startDate, startTime, endTime, status)
    }

    function formatEvent(event: ScheduleEvent) {
        return formatEventRow('indoor', event.start, event.end, event.title, event.status)
    }

    return (
        <Column style={{ maxWidth: '600px', margin: '0 auto'}}>
            <h1 className="text-2xl font-bold text-center">Upcoming Events</h1>
            <div key="practice-event" className="mb-4">
                <i className="fa-solid fa-clock mr-2"/>
                Call <a href={about.phoneUrl} className="text-blue-600 hover:underline">{about.phone}</a> for practice availability.
            </div>
            {events.length === 0 && (
                <span>No upcoming events.</span>
            )}
            {events.map((event) => (
                <div key={event.id}>
                    {formatEvent(event)}
                </div>
            ))}
        </Column>
    )
}
