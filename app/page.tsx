'use client'

import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/schedule/track.schedule.calendar'
import TrackScheduleCalendarNew from '@/components/schedule/track.schedule.calendar.new'
import TrackSocialsContainer from '@/components/socials/track.socials.container'
import HomeBanner from '@/components/home-banner/home.banner'
import Row from '@/components/ui/row'
import Column from '@/components/ui/column'

export default function Home() {

    return (
        <>
            <HomeBanner />
            <Row collapsible fullWidth shadowTop shadowBottom justify="center" align="center" className="py-8" style={{ backgroundColor: "#ffffff" }}>
                <Column justify="center" align="center">
                    <img src="images/fliers/schedule.updated.11.16.2025.jpg" alt="Schedule Flyer" style={{height: "600px"}}/>
                </Column>
                <Column justify="center" align="center" className="text-center w-full max-w-full lg:max-w-3xl">
                    <div className="text-center w-full max-w-full">
                        <TrackScheduleCalendar />
                    </div>
                </Column>
            </Row>
            <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-5">
                <div className="text-center w-full max-w-full lg:max-w-7xl">
                    <TrackScheduleTable />
                    <TrackSocialsContainer />
                </div>
            </main>
        </>
    )
}
