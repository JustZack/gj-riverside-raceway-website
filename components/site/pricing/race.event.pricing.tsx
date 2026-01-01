'use client'
import { Event } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';

export default function RaceEventPricing({event}: {event: Event}) {
    return (
        <BriefContentRow icon={event.icon} chipClass={event.chipClass} name={event.pluralizedName} 
            subtext={`$${event.additional} each additional class`}>
            ${event.entry} for first class
        </BriefContentRow>
    )
}
