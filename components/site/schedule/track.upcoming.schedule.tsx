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
    const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, (events: ScheduleEvent[]) => {
        setEvents(events)
        setIsLoadingEvents(false);
    }, true, 4), [])

    function eventRow(title: string, icon: string, dayOfTheWeek: string, startDate: string, startTime: string, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let statusClass = TrackScheduleUtils.getEventStatusClassByName(status);
        return (
            <Row className="flex items-start gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6 mt-0.5"><i className={icon + ' fa-xl'}/></span>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center flex-wrap min-w-0">
                        <span className={`${statusClass} flex items-center justify-center w-min mr-2`}>{status}</span>
                        <span className="font-semibold truncate">{title}</span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 mt-0.5">
                        <span>{dayOfTheWeek} {startDate} {startTime}</span>
                    </div>
                </div>
            </Row>
        )
    }

    function formatEventRow(title: string, type: 'indoor' | 'outdoor', start: Date, end: Date, status: 'cancelled' | 'finished' | 'upcoming' | 'running') {
        let dayOfTheWeek = format(start, 'EEEE')
        let startDate = format(start, 'MMMM dd, yyyy')
        let startTime = format(start, 'h:mma').toLocaleLowerCase()
        return eventRow(title, "fa-regular fa-calendar", dayOfTheWeek, startDate, startTime, status)
    }

    function formatEvent(event: ScheduleEvent) {
        return formatEventRow(event.title, 'indoor', event.start, event.end, event.status)
    }

    function renderPracticeRow() {
        return (
            <div key="events-practice">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <span className="flex items-center justify-center w-6 h-6"><i className="fa-solid fa-phone"/></span>
                    Call {about.getPhoneAnchorTag()} for practice.
                </Row>
            </div>
        )
    }

    function renderEventRows() {
        return (
            <>
                {isLoadingEvents && (
                    <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                        <span className="flex items-center justify-center w-6 h-6"><i className="fa-solid fa-arrows-rotate fa-spin"/></span>
                        <span>Loading events...</span>
                    </Row>
                )}
                {!isLoadingEvents && events.length === 0 && (
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
            </>
        )
    }

    return (
        <Column className={className} style={{maxWidth: width, ...style}}>
            <div key="events-header">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <h1 className="text-2xl font-bold text-center underline"><i>Upcoming Events</i></h1>
                </Row>
            </div>
            {renderPracticeRow()}
            {renderEventRows()}
        </Column>
    )
}
