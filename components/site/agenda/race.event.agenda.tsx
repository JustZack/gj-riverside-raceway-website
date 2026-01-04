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
            subtext={`Open@${doorsOpenTime}, Registration Closes@${registrationCloseTime}`}>
            Racing Starts@{racingStartTime}  
        </BriefContentRow>

    )
}
