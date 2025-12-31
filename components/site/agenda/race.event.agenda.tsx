'use client'
import { Event } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';

export default function RaceEventAgenda({event}: {event: Event}) {
    return (
        <BriefContentRow 
            icon={event.icon} chipClass={event.chipClass} name={event.pluralizedName} 
            mainText={`Racing Starts@${event.racingStart}`} 
            subtext={`Open@${event.doorsOpen}, Registration Closes@${event.registrationClose}`} />
    )
}
