'use client'

import TrackSocialsContainer from '@/components/site/socials/track.socials.container'
import SiteHomeBanner from '@/components/site/site.home.banner'

import { Button, Column, Row } from '@/components/ui/ui'

import TrackUpcomingSchedule from '@/components/site/schedule/track.upcoming.schedule'
import RacePricing from '@/components/site/pricing/race.pricing'
import RaceAgenda from '@/components/site/agenda/race.agenda'
import RaceClasses from '@/components/site/classes/race.classes'

export default function Home() {

    function FullWidthRow({children, className}: {children: React.ReactNode, className?: string}) {
        return (
            <Row collapsible fullWidth justify="center" align="center" className={`${className} py-4`}>
                {children}
            </Row>
        )    
    }

    function getQueryParam(param: string): string | null {
        if (typeof window !== 'undefined') {
            const params = new URLSearchParams(window.location.search);
            return params.get(param);
        }
        return null;
    }

    // Feature flag for showing classes section based on query string
    function doShowClasses(): boolean {
        let showClassesParam = getQueryParam('classes');
        return showClassesParam === 'true';
    }

    function PricingAndUpcomingSchedule() {
        return (
            <>
                <div className='hidden lg:block'>
                    {/* Combined schedule & pricing for large screens only */}
                    <FullWidthRow className="schedule bg-white">
                        <TrackUpcomingSchedule className='px-1' style={{margin: "0px 0px auto auto"}}/>
                        <RaceAgenda className='px-1' style={{margin: "0px 0px auto 0px"}}/>
                        <RacePricing  className='px-1' style={{margin: "0px auto auto 0px"}}/>
                    </FullWidthRow>
                    {/* Classes Container */}
                    {doShowClasses() && (
                    <FullWidthRow className="nav-pricing bg-gray-200">
                        <RaceClasses style={{margin: "0px auto auto auto"}}/>
                    </FullWidthRow>
                    )}
                </div>
                {/* Split schedule & pricing for smaller screens */}
                <div className='lblock lg:hidden'>
                    {/* Upcoming Events Container */}
                    <FullWidthRow className="schedule bg-white">
                        <TrackUpcomingSchedule style={{margin: "0px auto"}}/>
                    </FullWidthRow>

                    {/* Race Agenda Container */}
                    <FullWidthRow className="nav-agenda bg-gray-200">
                        <RaceAgenda style={{margin: "0px auto"}}/>
                    </FullWidthRow>

                    {/* Pricing Container */}
                    <FullWidthRow className="nav-classes bg-white">
                        <RacePricing style={{margin: "0px auto"}}/>
                    </FullWidthRow>

                    {/* Classes Container */}
                    {doShowClasses() && (
                    <FullWidthRow className="nav-pricing bg-gray-200">
                        <RaceClasses style={{margin: "0px auto"}}/>
                    </FullWidthRow>
                    )}
                </div>
            </>
        )
    }

    return (
            <>
            {/* Top Banner with Upcoming Events */}
                <section id="top" className="w-full nav-home">
                    <SiteHomeBanner />
                </section>

                {/* Combined container which adjusts based on screen size */}
                <PricingAndUpcomingSchedule/>

                {/* Socials Container */}
                <FullWidthRow className="nav-socials">
                    <TrackSocialsContainer />
                </FullWidthRow>
            </>
        )
}