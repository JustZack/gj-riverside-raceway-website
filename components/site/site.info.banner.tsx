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
    function showTodaysEvent() { return todaysEvent !== null; }
    function TodaysEventInfo() {
        if (todaysEvent) {
            let eventUrl = livetime.getResultLink(todaysEvent.id)
            function openLinkInNewTab(eventUrl: string) {
                window.open(eventUrl, '_blank', 'noopener,noreferrer');
            }
            return InfoContent(
                <>{todaysEvent.title} Today!</>,
                <>Doors Open@{new Date(todaysEvent.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</>,
                <Button
                    icon={livetimeSocial.buttonIcon} 
                    onClick={() => openLinkInNewTab(eventUrl)}
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

    function showDefaultInfo() { return !showTodaysEvent(); }
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
                <Row collapsible>
                    {showTodaysEvent() && (<TodaysEventInfo/>)}
                    {showDefaultInfo() && (<DefaultInfo/>)}
                </Row>
            </Column>
        </>
    )
}