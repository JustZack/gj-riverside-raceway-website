'use client'
import { Event } from '@/content/content';
import RacePricingRow from '@/components/site/pricing/race.pricing.row';

export default function RacePracticePricing({practice}: {practice: Event}) {
    return (
        <RacePricingRow 
            icon={practice.icon} chipClass={practice.chipClass} 
            name={practice.name} mainText={`$${practice.entry} for entry`} />
        )
}
