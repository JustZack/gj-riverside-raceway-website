'use client'

import TrackSocialsContainer from '@/components/site/socials/track.socials.container'
import SiteHomeBanner from '@/components/site/site.home.banner'

import { Button, Column, ContentWithIcon, InfoWithSubtext, Row } from '@/components/ui/ui'

import TrackUpcomingSchedule from '@/components/site/schedule/track.upcoming.schedule'
import RacePricing from '@/components/site/pricing/race.pricing'
import RaceAgenda from '@/components/site/agenda/race.agenda'
import RaceClasses from '@/components/site/classes/race.classes'
import SiteInfoBanner from '@/components/site/site.info.banner'

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

    let whiteRow = true;
    //Easily alternate row colors
    function getNextRowClass(whiteOverride: boolean = false): string {
        let isWhite = whiteOverride || whiteRow;
        const rowClass = isWhite ? 'bg-white' : 'bg-gray-200';
        whiteRow = !isWhite;
        return rowClass;
    }

    // Feature flag for showing classes section based on query string
    function doShowClasses(): boolean {
        let showClassesParam = getQueryParam('classes');
        return showClassesParam === 'true';
    }

    function SiteHomeBody() {
        return (
            <>
                {/* Home page banner is identical for any screen size*/}
                <SiteHomeBanner />
                <div className='hidden lg:block'>
                    {/* Dynamic Info Row */}
                    <FullWidthRow className={`track-type ${getNextRowClass()}`}>
                        <SiteInfoBanner/>
                    </FullWidthRow>
                    {/* Combined schedule & pricing for large screens only */}
                    <FullWidthRow className={`schedule ${getNextRowClass()}`}>
                        <TrackUpcomingSchedule className='px-1' style={{margin: "0px 0px auto auto"}}/>
                        <RaceAgenda className='px-1' style={{margin: "0px 0px auto 0px"}}/>
                        <RacePricing  className='px-1' style={{margin: "0px auto auto 0px"}}/>
                    </FullWidthRow>
                    {/* Classes Container */}
                    {doShowClasses() && (
                    <FullWidthRow className={`nav-pricing ${getNextRowClass()}`}>
                        <RaceClasses style={{margin: "0px auto auto auto"}}/>
                    </FullWidthRow>
                    )}
                </div>
                {/* Split schedule & pricing for smaller screens */}
                <div className='block lg:hidden'>
                    {/* Dynamic Info Row */}
                    <FullWidthRow className={`info ${getNextRowClass()}`}>
                        <SiteInfoBanner/>
                    </FullWidthRow>
                    {/* Upcoming Events Container */}
                    <FullWidthRow className={`schedule ${getNextRowClass()}`}>
                        <TrackUpcomingSchedule style={{margin: "0px auto"}}/>
                    </FullWidthRow>

                    {/* Race Agenda Container */}
                    <FullWidthRow className={`nav-agenda ${getNextRowClass()}`}>
                        <RaceAgenda style={{margin: "0px auto"}}/>
                    </FullWidthRow>

                    {/* Classes Container */}
                    {doShowClasses() && (
                    <FullWidthRow className={`nav-pricing ${getNextRowClass()}`}>
                        <RaceClasses style={{margin: "0px auto"}}/>
                    </FullWidthRow>
                    )}

                    {/* Pricing Container */}
                    <FullWidthRow className={`nav-classes ${getNextRowClass()}`}>
                        <RacePricing style={{margin: "0px auto"}}/>
                    </FullWidthRow>
                </div>
                {/* Socials Container is identical for any screen size*/}
                <FullWidthRow className="nav-socials">
                    <TrackSocialsContainer />
                </FullWidthRow>
            </>
        )
    }

    return (<SiteHomeBody/>)
}