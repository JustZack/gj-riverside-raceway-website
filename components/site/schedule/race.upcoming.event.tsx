'use client'
import BriefContentRow from '@/components/site/brief/brief.content.row';
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils';
import { format } from 'date-fns'
import { events } from '@/content/content';

export default function RaceUpcomingEvent({event}: {event: ScheduleEvent}) {

    let dayOfTheWeek = format(event.start, 'EEEE')
    let eventInfo = events[dayOfTheWeek.toLowerCase() as keyof typeof events];

    let shortDayOfTheWeek = format(event.start, 'EEE')
    let startDate = format(event.start, 'MMM dd, yyyy')
    let startTime = format(event.start, 'h:mma').toLocaleLowerCase()

    let isToday = TrackScheduleUtils.eventIsToday(event);
    let name, chipClass;
    if (isToday) {
        name = "Today"
        chipClass = event.statusClass;
    } else {
        name = eventInfo?.name || dayOfTheWeek
        chipClass = eventInfo?.chipClass || ""
    }
    return (
        <BriefContentRow icon={"fa-regular fa-calendar"} chipClass={chipClass} name={name} 
            subtext={`${shortDayOfTheWeek} ${startDate} Opens ${startTime}`}>
            {event.title}
        </BriefContentRow>
    )
}
