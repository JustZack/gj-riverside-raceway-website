'use client'

import { Column, Row } from '@/components/ui/ui'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import { useState, useEffect } from 'react'
import TimeUtils from '@/lib/utils/time'
import { SitePhoneDisplayForPractice } from '../site.phone.display'
import SiteInfoContent from './site.info.content'
import LiveTimeEventButton from '../buttons/livetime.event.button'

export default function SiteInfoBanner() {
    const [loading, setLoading] = useState<boolean>(true);
    const [nextEvent, setNextEvent] = useState<ScheduleEvent | null>(null);
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, (event: ScheduleEvent[]) => {
        setNextEvent(event[0] || null);
        setLoading(false);
    }, true, 1), []);

    function SitePhone() { return (<SitePhoneDisplayForPractice className="px-4"/>) }

    function isLoading(): boolean                   { return loading; }
    function hasNextEvent(): boolean                { return nextEvent !== null; }
    function hasEventToday(): boolean               { return hasNextEvent() && TrackScheduleUtils.eventIsToday(nextEvent);  }
    function hasUpcomingEventNotToday(): boolean    { return hasNextEvent() && TrackScheduleUtils.eventIsUpcoming(nextEvent); }
    function hasUpcomingEventToday(): boolean       { return hasEventToday() && nextEvent?.status === 'today'; }
    function hasOpenEventToday(): boolean           { return hasEventToday() && nextEvent?.status === 'running'; }
    function hasRegisteringEventToday(): boolean    { return hasEventToday() && nextEvent?.status === 'registering'; }

    function loadingEventInfo() {
        return <SiteInfoContent aIcon={`fa-solid fa-rotate fa-spin`} a={`Loading upcoming race...`} c={<SitePhone/>} />
    }

    function RegisteringEventInfo() {
        return <SiteInfoContent aIcon={nextEvent!.statusIcon} a={`Registration open for todays race!`} d={<LiveTimeEventButton event={nextEvent!} />} />
    }
        
    function RunningEventInfo() {
        return <SiteInfoContent aIcon={nextEvent!.statusIcon} a={`${nextEvent!.title} in progress!`} d={<LiveTimeEventButton event={nextEvent!} />} />
    }

    function TodaysEventInfo() {
        let opensAt = TimeUtils.getShortTimeString(nextEvent!.start);
        return <SiteInfoContent aIcon={nextEvent!.statusIcon} a={`${nextEvent!.title} today!`} b={`Doors Open ${opensAt}`} d={<LiveTimeEventButton event={nextEvent!} />} />
    }

    function NotTodayEventInfo() {
        let nextRaceDate = TimeUtils.getShortDateString(nextEvent!.start, false, true)
        return <SiteInfoContent aIcon={nextEvent!.statusIcon} a={`Next race ${nextRaceDate}`} c={<SitePhone/>} />
    }

    function DefaultInfo() {
        return <SiteInfoContent aIcon={`fa-solid fa-info-circle`} a={`No races scheduled, check back soon!`} c={<SitePhone/>} />
    }

    function SiteInfo() {
        if (isLoading())                        return loadingEventInfo();
        else if (hasRegisteringEventToday())    return RegisteringEventInfo();
        else if (hasOpenEventToday())           return RunningEventInfo();
        else if (hasUpcomingEventToday())       return TodaysEventInfo();
        else if (hasUpcomingEventNotToday())    return NotTodayEventInfo();
        else                                    return DefaultInfo();
    }

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