'use client'
import { EventClass, eventClasses } from '@/content/content';
import { Column, ContentWithIcon, InfoWithSubtext } from '@/components/ui/ui'
import BriefContentHeader from '@/components/site/brief/brief.content.header';
import RaceClass from '@/components/site/classes/race.class';
import BriefContentRow from '../brief/brief.content.row';

export default function RaceClasses({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <BriefContentHeader icon="fa-solid fa-car">Classes</BriefContentHeader> 
            <ContentWithIcon icon="fa-solid fa-info-circle">
                <InfoWithSubtext subText="Classes may be combined or split based on entries">
                    <span className='font-semibold truncate'>Three or more cars constitute a class</span>
                </InfoWithSubtext>
            </ContentWithIcon>
            {Object.values(eventClasses).map((eventClass: EventClass) => {
                if (!eventClass.hidden) return (<RaceClass key={eventClass.id} eventClass={eventClass} />)
            })}
        </Column>
    )
}
