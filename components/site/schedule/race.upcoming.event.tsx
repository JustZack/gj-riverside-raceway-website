'use client'
import BriefContentRow from '@/components/site/brief/brief.content.row';
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils';
import { events } from '@/content/content';
import TimeUtils from '@/lib/utils/time';

export default function RaceUpcomingEvent({event}: {event: ScheduleEvent}) {
    return (
        <BriefContentRow icon={event.statusIcon} chipClass={event.statusClass} name={event.statusText} 
            subtext={`${TimeUtils.getShortDateTimeString(event.start, " Opens ")}`}>
            {event.title}
        </BriefContentRow>
    )
}
