'use client'

import { Column, Button, Row, ContentWithIcon } from '@/components/ui/ui'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import { useState, useEffect } from 'react'
import { socials, livetime, about } from '@/content/content'

export default function SiteInfoBanner() {
    const [todaysEvent, setTodaysEvent] = useState<ScheduleEvent | null>(null);
    useEffect(TrackScheduleUtils.getTodaysScheduledEvent.bind(null, setTodaysEvent, true), []);

    function InfoContent(contentA: React.JSX.Element, contentB?: React.JSX.Element, contentC?: React.JSX.Element) {
        return (
            <>
                <span className="font-bold text-xl">{contentA}</span>
                {contentB && (<span className="font-bold text-xl">{contentB}</span>)}
                {contentC && (<span className="text-md">{contentC}</span>)}
            </>
        )
    }

    let livetimeSocial = socials.find(social => social.name === "LiveTime RC")!;

    function hasEventToday() { return todaysEvent !== null; }

    function showTodaysEvent() { return hasEventToday() && todaysEvent?.status !== 'running'; }
    function TodaysEventInfo() {
        if (todaysEvent) {
            return InfoContent(
                <>{todaysEvent.title} Today!</>,
                <>Opens {new Date(todaysEvent.start).toLocaleTimeString([], {hour: 'numeric', minute:'2-digit'})}</>,
                <Button
                    icon={livetimeSocial.buttonIcon} 
                    onClick={() => window.open(todaysEvent.link!, '_blank', 'noopener,noreferrer')}
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
        return null;
    }
    
    function showRunningEvent() { return hasEventToday() && todaysEvent?.status === 'running'; }
    function RunningEventInfo() {
        if (todaysEvent) {
            return InfoContent(
                <>{todaysEvent.title} Running now!</>,
                <Button
                    icon={livetimeSocial.buttonIcon} 
                    onClick={() => window.open(todaysEvent.link!, '_blank', 'noopener,noreferrer')}
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
        return null;
    }


    function showDefaultInfo() { return !showRunningEvent() && !showTodaysEvent(); }
    function DefaultInfo() {
        return InfoContent(
            <>Check our upcoming races below!</>,
            undefined,
            <ContentWithIcon icon="fa-solid fa-phone">Call {about.getPhoneAnchorTag()} for practice.</ContentWithIcon>
        )
    }

    return (
        <>
            <Column>
                <Row collapsible gap={3}>
                    {showRunningEvent() && (<RunningEventInfo/>)}
                    {showTodaysEvent() && (<TodaysEventInfo/>)}
                    {showDefaultInfo() && (<DefaultInfo/>)}
                </Row>
            </Column>
        </>
    )
}