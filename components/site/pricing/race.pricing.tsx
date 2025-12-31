'use client'
import { products, events } from '@/content/content';
import { Column, Row } from '@/components/ui/ui'
import RaceEventPricing from '@/components/site/pricing/race.event.pricing';
import RaceProductPricing from '@/components/site/pricing/race.product.pricing';
import RacePracticePricing from '@/components/site/pricing/race.practice.pricing';
import BriefContentHeader from '@/components/site/brief/brief.content.header';

export default function RacePricing({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <BriefContentHeader icon="fa-solid fa-dollar-sign">Pricing</BriefContentHeader>
            <RaceEventPricing event={events.tuesday} />
            <RaceEventPricing event={events.saturday} />
            <RacePracticePricing practice={events.practice} />
            <RaceProductPricing product={products.transponder} />
        </Column>
    )
}
