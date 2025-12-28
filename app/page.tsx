'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/schedule/track.schedule.calendar'
import TrackScheduleCalendarNew from '@/components/schedule/track.schedule.calendar.new'
import TrackSocialsContainer from '@/components/socials/track.socials.container'

export default function Home() {

    return (
        <div className="text-center w-full max-w-full lg:max-w-7xl">
            <TrackScheduleCalendar />
            <TrackScheduleCalendarNew/>
            <TrackScheduleTable />
            <TrackSocialsContainer />
        </div>
    )
}
