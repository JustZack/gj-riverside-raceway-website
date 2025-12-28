'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/schedule/track.schedule.calendar'
import TrackSocialsContainer from '@/components/socials/track.socials.container'

export default function Home() {

    return (
        <div className="text-center w-full max-w-full lg:max-w-7xl">
            <TrackScheduleCalendar />
            <TrackScheduleTable />
            <TrackSocialsContainer />
        </div>
    )
}
