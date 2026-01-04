'use client'
import { Button } from '@/components/ui/ui'
import { socials } from '@/content/content'
import { ScheduleEvent } from '@/lib/utils/track.schedule.utils';

let livetimeSocial = socials.find(social => social.name === "LiveTime RC")!;
export default function LiveTimeEventButton({event}: {event: ScheduleEvent}) {
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