'use client'
import { products, events } from '@/content/content';
import { Column, Row } from '@/components/ui/ui'
import RaceEventPricing from '@/components/site/pricing/race.event.pricing';
import RaceProductPricing from './race.product.pricing';
import RacePracticePricing from './race.practice.pricing';

export default function RacePricing({className, style, width = "350px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <h1 className="text-2xl font-bold text-center underline">
                    <i className="fa-solid fa-dollar-sign mr-4"></i>Pricing
                </h1>
            </Row>
            <RaceEventPricing event={events.tuesdays} />
            <RaceEventPricing event={events.saturdays} />
            <RacePracticePricing practice={events.practice} />
            <RaceProductPricing product={products.transponder} />
        </Column>
    )
}
