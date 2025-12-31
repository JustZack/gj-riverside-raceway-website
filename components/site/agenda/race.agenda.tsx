'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { events, Event } from '@/content/content';
import { InfoWithSubtext, Column, Row, Chip } from '@/components/ui/ui'
import BriefContentHeader from '@/components/site/brief/brief.content.header';
import RaceEventAgenda from '@/components/site/agenda/race.event.agenda';

export default function RaceAgenda({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <BriefContentHeader icon="fa-solid fa-clock">Agenda</BriefContentHeader>
            <RaceEventAgenda event={events.tuesday} />
            <RaceEventAgenda event={events.saturday} />
        </Column>
    )
}
