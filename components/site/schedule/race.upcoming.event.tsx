'use client'
import BriefContentRow from '@/components/site/brief/brief.content.row';
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils';
import { events } from '@/content/content';
import TimeUtils from '@/lib/utils/time';

export default function RaceUpcomingEvent({event}: {event: ScheduleEvent}) {

    let dayOfTheWeek = TimeUtils.getDayOfTheWeek(event.start, false);
    let eventInfo = events[dayOfTheWeek.toLowerCase() as keyof typeof events];

    let isToday = TrackScheduleUtils.eventIsToday(event);
    let isRunning = TrackScheduleUtils.eventIsRunning(event);
    let name, chipClass;
    if (isToday) {
        name = isRunning ? "Running" : "Today";
        chipClass = event.statusClass;
    } else {
        name = eventInfo?.name || dayOfTheWeek
        chipClass = eventInfo?.chipClass || ""
    }
    return (
        <BriefContentRow icon={"fa-regular fa-calendar"} chipClass={chipClass} name={name} 
            subtext={`${TimeUtils.getShortDateTimeString(event.start, " Opens ")}`}>
            {event.title}
        </BriefContentRow>
    )
}
