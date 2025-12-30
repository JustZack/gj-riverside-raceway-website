'use client'

import TrackScheduleTable from '@/components/site/schedule/track.schedule.table'
import TrackScheduleCalendar from '@/components/site/schedule/track.schedule.calendar'
import TrackScheduleCalendarNew from '@/components/site/schedule/track.schedule.calendar.new'
import TrackSocialsContainer from '@/components/site/socials/track.socials.container'
import SiteHomeBanner from '@/components/site/site.home.banner'

import { Button, Column, Row } from '@/components/ui/ui'
import { navigation } from '@/content/content'
import RacingRules from '@/components/site/racing.rules'
import TrackUpcomingSchedule from '@/components/site/schedule/track.upcoming.schedule'

export default function Home() {

    function homePageV0() {
        return (
            <>
                <SiteHomeBanner />
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

    function FullWidthRow({children, className}: {children: React.ReactNode, className?: string}) {
        return (
            <Row collapsible fullWidth justify="center" align="center" className={`${className} py-4`}>
                {children}
            </Row>
        )    
    }

    function homePageV1() {
        return (
            <>
            {/* Top Banner with Upcoming Events */}
                <section id="top" className="w-full nav-home">
                    <SiteHomeBanner />
                </section>

                <FullWidthRow className="schedule bg-white">
                    <TrackUpcomingSchedule />
                </FullWidthRow>
                
                {/* Socials Container */}
                <FullWidthRow className="nav-socials">
                    <TrackSocialsContainer />
                </FullWidthRow>
            </>
        )
    }

    return homePageV1()
}
