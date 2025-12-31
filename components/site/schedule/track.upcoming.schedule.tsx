'use client'
import { useState, useEffect, useCallback } from 'react'
import { format } from 'date-fns'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import { about } from '@/content/content';
import { InfoWithSubtext, Column, Row, Chip } from '@/components/ui/ui'
import BriefContentHeader from '@/components/site/brief/brief.content.header';
import BriefContentRow from '@/components/site/brief/brief.content.row';
import RaceUpcomingEvent from '@/components/site/schedule/race.upcoming.event';

export default function TrackUpcomingSchedule({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    const [events, setEvents] = useState<ScheduleEvent[]>([])
    const [isLoadingEvents, setIsLoadingEvents] = useState<boolean>(true);
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, onUpcomingEventsLoaded, true, 4), [])

    function onUpcomingEventsLoaded(events: ScheduleEvent[]) {
        setEvents(events)
        setIsLoadingEvents(false);
    }

    function StaticContentRow({icon, children}: {icon: string, children: React.ReactNode}) {
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6">
                    <i className={icon}/>
                </span>
                <span>{children}</span>
            </Row>
        )
    }

    function EventRows() {
        return (
            <>
                {isLoadingEvents && (
                    <StaticContentRow icon="fa-solid fa-arrows-rotate fa-spin">Loading events...</StaticContentRow>
                )}
                {!isLoadingEvents && events.length === 0 && (
                    <StaticContentRow icon="fa-regular fa-calendar">No upcoming events.</StaticContentRow>
                )}
                {events.map((event) => (
                    <RaceUpcomingEvent key={event.id} event={event} />
                ))}
            </>
        )
    }

    return (
        <Column className={className} style={{maxWidth: width, width, ...style}}>
            <BriefContentHeader icon="fa-solid fa-flag-checkered">Races</BriefContentHeader>
            <EventRows/>
            <StaticContentRow icon="fa-solid fa-phone">Call {about.getPhoneAnchorTag()} for practice.</StaticContentRow>
        </Column>
    )
}
