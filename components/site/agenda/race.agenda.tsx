'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { events, Events } from '@/content/content';
import { InfoWithSubtext, Column, Row, Chip } from '@/components/ui/ui'

export default function RaceAgenda({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    function renderAgendaRow(icon: string, chipClass: string, type: string, name: string, mainText: string, subtext: string = "") {
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={icon}/></span>
                <InfoWithSubtext className="flex flex-col min-w-0" style={{width: 'auto'}} subText={subtext}>
                    <Chip className={chipClass} width="85px">{name}</Chip>
                    <span className="font-semibold truncate">{mainText}</span>
                </InfoWithSubtext>
            </Row>
        )
    }
    function renderEventAgendaRow(eventEntry: Events) {
        let mainText = `Racing Starts@${eventEntry.racingStart}`
        let subText = `Open@${eventEntry.doorsOpen}, Registration Closes@${eventEntry.registrationClose}`
        return renderAgendaRow(eventEntry.icon, eventEntry.chipClass, eventEntry.id, eventEntry.name, mainText, subText)
    }

    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <div key="events-header">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <h1 className="text-2xl font-bold text-center underline">
                        <i className="fa-solid fa-clock mr-4"></i>Agenda
                    </h1>
                </Row>
            </div>
            {renderEventAgendaRow(events.weeknights)}
            {renderEventAgendaRow(events.weekends)}
        </Column>
    )
}
