'use client'

import { Column, Button, Row, ContentWithIcon } from '@/components/ui/ui'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import { useState, useEffect } from 'react'
import { socials, livetime } from '@/content/content'
import TimeUtils from '@/lib/utils/time'
import { SitePhoneDisplayForPractice } from './site.phone.display'

export default function SiteInfoBanner() {
    const [loading, setLoading] = useState<boolean>(true);
    const [nextEvent, setNextEvent] = useState<ScheduleEvent | null>(null);
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, (event: ScheduleEvent[]) => {
        setNextEvent(event[0] || null);
        setLoading(false);
    }, true, 1), []);

    type InfoContentProps = {
        aIcon: string;
        a: React.JSX.Element | string;
        b?: React.JSX.Element | string;
        c?: React.JSX.Element | string;
        d?: React.JSX.Element | string;
    }
    function InfoContent({aIcon, a, b, c, d}: InfoContentProps) {
        return (
            <>
                <span className="font-bold text-xl">
                    <ContentWithIcon icon={aIcon}>{a}</ContentWithIcon>
                </span>
                {b && (<span className="font-bold text-xl">{b}</span>)}
                {c && (<span className="text-md">{c}</span>)}
                {d && (<span className="text-sm">{d}</span>)}
            </>
        )
    }

    let livetimeSocial = socials.find(social => social.name === "LiveTime RC")!;
    function EventLiveTimeButton({event}: {event: ScheduleEvent}) {
        return (
            <Button
                icon={livetimeSocial.buttonIcon} 
                onClick={() => window.open(event!.link!, '_blank', 'noopener,noreferrer')}
                textColor={"#ffffff"}
                backgroundColor={livetimeSocial.primaryColor}
                borderColor={livetimeSocial.primaryColor}
                hoverTextColor={livetimeSocial.primaryColor}
                hoverBackgroundColor="rgba(255, 255, 255, 0.8)"
                hoverBorderColor={livetimeSocial.primaryColor}
                height={35}>
                Results on {livetimeSocial.name}
            </Button>
        )
    }

    function SitePhone() { return (<SitePhoneDisplayForPractice className="px-4"/>) }

    function isLoading(): boolean { return loading; }
    function hasNextEvent(): boolean { return nextEvent !== null; }
    function hasEventToday(): boolean { return hasNextEvent() && TrackScheduleUtils.eventIsToday(nextEvent);  }
    function hasUpcomingEventNotToday(): boolean { return hasNextEvent() && TrackScheduleUtils.eventIsUpcoming(nextEvent); }
    function hasUpcomingEventToday(): boolean { return hasEventToday() && nextEvent?.status !== 'running'; }
    function hasOpenEventToday(): boolean { return hasEventToday() && nextEvent?.status === 'running'; }

    function loadingEventInfo() {
        return InfoContent({aIcon: `fa-solid fa-rotate fa-spin`, a: `Checking for upcoming races . . .`, c: <SitePhone/>})
    }

    function NotTodayEventInfo() {
        if (hasNextEvent()) {
            let nextRaceDate = TimeUtils.getShortDateString(nextEvent!.start, false, true)
            return InfoContent({aIcon: `fa-solid fa-calendar-day`, a: `Next race ${nextRaceDate}`, c: <SitePhone/>})
        }
    }

    function TodaysEventInfo() {
        if (hasNextEvent()) {
            let opensAt = TimeUtils.getShortTimeString(nextEvent!.start);
            return InfoContent({aIcon: `fa-solid fa-flag-checkered`, a: `${nextEvent!.title} Today!`, b: `Opens ${opensAt}`, d: <EventLiveTimeButton event={nextEvent!} />})
        }
    }
    
    function RunningEventInfo() {
        if (hasNextEvent()) {
            return InfoContent({aIcon: `fa-solid fa-flag-checkered`, a: `${nextEvent!.title} Open now!`, d: <EventLiveTimeButton event={nextEvent!} />})
        }
    }
    
    function DefaultInfo() {
        return InfoContent({aIcon: `fa-solid fa-info-circle`, a: `No races scheduled, check back soon!`, c: <SitePhone/>})
    }

    function SiteInfo() {
        if (isLoading())                        return loadingEventInfo();
        else if (hasOpenEventToday())           return RunningEventInfo();
        else if (hasUpcomingEventToday())       return TodaysEventInfo();
        else if (hasUpcomingEventNotToday())    return NotTodayEventInfo();
        else                                    return DefaultInfo();
    }

    console.log(`Rendering SiteInfoBanner, nextEvent: ${nextEvent?.title || 'none'}`);
    return (
        <>
            <Column>
                <Row collapsible gap={2}>
                    <SiteInfo/>
                </Row>
            </Column>
        </>
    )
}