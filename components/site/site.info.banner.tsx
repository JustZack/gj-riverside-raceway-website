'use client'

import { Column, Button, Row, ContentWithIcon } from '@/components/ui/ui'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import { useState, useEffect } from 'react'
import { socials, livetime } from '@/content/content'
import TimeUtils from '@/lib/utils/time'
import { SitePhoneDisplayForPractice } from './site.phone.display'
import { TimerDisplay } from '../ui/timer'

export default function SiteInfoBanner() {
    const [nextEvent, setNextEvent] = useState<ScheduleEvent | null>(null);
    useEffect(TrackScheduleUtils.getUpcomingScheduleEvents.bind(null, (event: ScheduleEvent[]) => {
        setNextEvent(event[0] || null);
        console.log(event)
    }, true, 1), []);

    function InfoContent(contentAIcon: string, contentA: React.JSX.Element | string, contentB?: React.JSX.Element | string, contentC?: React.JSX.Element | string, contentD?: React.JSX.Element | string) {
        return (
            <>
                <span className="font-bold text-xl">
                    <ContentWithIcon icon={contentAIcon}>{contentA}</ContentWithIcon>
                </span>
                {contentB && (<span className="font-bold text-xl">{contentB}</span>)}
                {contentC && (<span className="text-md">{contentC}</span>)}
                {contentD && (<span className="text-sm">{contentD}</span>)}
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

    function hasNextEvent(): boolean { return nextEvent !== null; }
    function hasEventToday(): boolean { return hasNextEvent() && TrackScheduleUtils.eventIsToday(nextEvent);  }
    function hasUpcomingEventNotToday(): boolean { return hasNextEvent() && TrackScheduleUtils.eventIsUpcoming(nextEvent); }
    function hasUpcomingEventToday(): boolean { return hasEventToday() && nextEvent?.status !== 'running'; }
    function hasOpenEventToday(): boolean { return hasEventToday() && nextEvent?.status === 'running'; }

    function NotTodayEventInfo() {
        if (hasNextEvent()) {
            let nextRaceDate = TimeUtils.getShortDateString(nextEvent!.start, false, true)
            return InfoContent(`fa-solid fa-calendar-day`, `Next race ${nextRaceDate}`, undefined, undefined, <SitePhone/>)
        }
    }

    function TodaysEventInfo() {
        if (hasNextEvent()) {
            let opensAt = TimeUtils.getShortTimeString(nextEvent!.start);
            return InfoContent(`fa-solid fa-flag-checkered`, `${nextEvent!.title} Today!`, `Opens ${opensAt}`, <EventLiveTimeButton event={nextEvent!} />
            )
        }
    }
    
    function RunningEventInfo() {
        if (hasNextEvent()) {
            return InfoContent(`fa-solid fa-flag-checkered`, `${nextEvent!.title} Open now!`, undefined, <EventLiveTimeButton event={nextEvent!} />)
        }
    }
    
    function DefaultInfo() {
        return InfoContent(`fa-solid fa-info-circle`, `Check our upcoming races below!`, undefined, <SitePhone/>)
    }

    function SiteInfo() {
        if (hasOpenEventToday()) return RunningEventInfo();
        if (hasUpcomingEventToday()) return TodaysEventInfo();
        if (hasUpcomingEventNotToday()) return NotTodayEventInfo();
        return DefaultInfo();
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