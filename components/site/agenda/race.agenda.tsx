'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Row from '@/components/ui/row'
import { events, Events } from '@/content/content';
import Column from '@/components/ui/column'

export default function RaceAgenda({className, style, width = "315px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    function renderAgendaRow(icon: string, type: string, name: string, mainText: string, subtext: string = "") {
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={icon}/></span>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center flex-wrap min-w-0">
                        <span className={`flex items-center justify-center w-min mr-2`}>{name}</span>
                        <span className="font-semibold truncate">{mainText}</span>
                    </div>
                    {subtext && (
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                            <span>{subtext}</span>
                        </div>
                    )}  
                </div>

            </Row>
        )
    }
    function renderEventAgendaRow(eventEntry: Events) {
        let mainText = `Racing Starts@${eventEntry.racingStart}`
        let subText = `Open@${eventEntry.doorsOpen}, Registration closes@${eventEntry.registrationClose}`
        return renderAgendaRow(eventEntry.icon, eventEntry.id, eventEntry.name, mainText, subText)
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
