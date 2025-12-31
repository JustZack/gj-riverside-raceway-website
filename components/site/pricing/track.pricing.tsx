'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Row from '@/components/ui/row'
import { products, eventPricing, EventPricing } from '@/content/content';
import Column from '@/components/ui/column'

export default function TrackPricing({className, style, width = "500px"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    function renderPricingRow(icon: string, type: string, name: string, text: string) {
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={icon}/></span>
                <span>{name}: {text}</span>
            </Row>
        )
    }
    function renderEventPricingRow(pricingEntry: EventPricing) {
        let pricingText = `1st entry $${pricingEntry.entry}, $${pricingEntry.additional}/add'l entry`
        return renderPricingRow("fa-regular fa-dollar-sign", pricingEntry.id, pricingEntry.name, pricingText)
    }

    return (
        <Column className={className} style={{ maxWidth: width, ...style}}>
            <div key="events-header">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <h1 className="text-2xl font-bold text-center underline"><i>Event Pricing</i></h1>
                </Row>
            </div>
            {renderEventPricingRow(eventPricing.weeknights)}
            {renderEventPricingRow(eventPricing.weekends)}
            {renderPricingRow("fa-solid fa-hourglass", "transponder", "Transponders", `available for $${products.transponder.price} each.`)}
        </Column>
    )
}
