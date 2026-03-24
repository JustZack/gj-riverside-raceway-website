'use client'
import { EventClass, eventClasses } from '@/content/content';
import { Column, ContentWithIcon, InfoWithSubtext } from '@/components/ui/ui'
import TabbedContent from '@/components/ui/tabbed.content';
import BriefContentHeader from '@/components/site/brief/brief.content.header';
import RaceClass from '@/components/site/classes/race.class';

export default function RaceClasses({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    
    function ClassSection({type}: {type: 'outdoor' | 'indoor'}) {
        return Object.values(eventClasses[type] || {}).map((eventClass: EventClass) => (
            eventClass.hidden ? null : <RaceClass key={eventClass.id} eventClass={eventClass} />
        ))
    }

    const tabs = [
        {
            label: 'Outdoor', 
            content: (<ClassSection type="outdoor" />),
            color: "text-red-800"
        },
        {
            label: 'Indoor', 
            content: (<ClassSection type="indoor" />),
            color: "text-blue-900"
        },
    ]
    
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}} gap={2}>
            <BriefContentHeader icon="fa-solid fa-car">Classes & Rules</BriefContentHeader>
            <TabbedContent tabs={tabs} initialTab={0}
            />
            <ContentWithIcon icon="fa-solid fa-info-circle">
                <InfoWithSubtext subText="Classes may be combined or split based on entries">
                    <span className='font-semibold truncate'>Two or more similar cars form a class</span>
                </InfoWithSubtext>
            </ContentWithIcon>
            <ContentWithIcon icon="fa-solid fa-warning">
                <InfoWithSubtext subText="Check back often for updates">
                    <span className='font-semibold truncate'>Classes & Rules are subject to change</span>
                </InfoWithSubtext>
            </ContentWithIcon>
        </Column>
    )
}
