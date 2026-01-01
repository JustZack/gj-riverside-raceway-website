'use client'
import { Event } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';

export default function RaceEventAgenda({event}: {event: Event}) {
    return (
        <BriefContentRow 
            icon={event.icon} chipClass={event.chipClass} name={event.pluralizedName} 
            subtext={`Open@${event.doorsOpen}, Registration Closes@${event.registrationClose}`}>
            Racing Starts@{event.racingStart}  
        </BriefContentRow>

    )
}
