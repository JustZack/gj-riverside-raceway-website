'use client'
import { Event } from '@/content/content';
import RacePricingRow from '@/components/site/pricing/race.pricing.row';

export default function RaceEventPricing({event}: {event: Event}) {
    return (
        <RacePricingRow 
            icon={event.icon} chipClass={event.chipClass} name={event.name} 
            mainText={`$${event.entry} for first class`} subtext={`$${event.additional} each additional class`} />
    )
}
