'use client'
import { Event } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';

export default function RacePracticePricing({practice}: {practice: Event}) {
    return (
        <BriefContentRow 
            icon={practice.icon} chipClass={practice.chipClass} 
            name={practice.name} 
            mainText={`$${practice.entry} for entry`} />
        )
}
