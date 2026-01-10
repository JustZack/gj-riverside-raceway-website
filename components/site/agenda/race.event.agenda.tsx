'use client'
import { Event } from '@/content/content';
import BriefContentRow from '@/components/site/brief/brief.content.row';
import TimeUtils from '@/lib/utils/time';

export default function RaceEventAgenda({event}: {event: Event}) {
    let doorsOpenTime = TimeUtils.formatTimeFromString(event.doorsOpen!);
    let registrationCloseTime = TimeUtils.formatTimeFromString(event.registrationClose!);
    let racingStartTime = TimeUtils.formatTimeFromString(event.racingStart!);

    return (
        <BriefContentRow 
            icon={event.icon} chipClass={event.chipClass} name={event.pluralizedName} 
            subtext={`Opens at ${doorsOpenTime} - Registration closes at ${registrationCloseTime}`}>
            Racing starts at {racingStartTime}  
        </BriefContentRow>

    )
}
