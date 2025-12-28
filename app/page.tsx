'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/schedule/track.schedule.calendar'
import TrackSocialsContainer from '@/components/socials/track.socials.container'
import SiteHeader from '@/components/header/site.header'
import SiteFooter from '@/components/footer/site.footer'

export default function Home() {

    return (
        <div>
            <SiteHeader />
            <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-5">
                <div className="text-center w-full max-w-full lg:max-w-7xl">
                    <TrackScheduleCalendar />
                    <TrackScheduleTable />
                    <TrackSocialsContainer />
                </div>
            </main>
            <SiteFooter/>
        </div>
    )
}
