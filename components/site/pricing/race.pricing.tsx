'use client'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Row from '@/components/ui/row'
import { products, events, Events } from '@/content/content';
import Column from '@/components/ui/column'

export default function RacePricing({className, style, width = "315spx"}: {className?: string, style?: React.CSSProperties, width?: string}) {
    function renderPricingRow(icon: string, type: string, name: string, mainText: string, subtext: string = "") {
        return (
            <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                <span className="flex items-center justify-center w-6 h-6"><i className={icon}/></span>
                <div className="flex flex-col min-w-0">
                    <div className="flex items-center flex-wrap min-w-0">
                        <span className={`flex items-center justify-center w-min mr-2`}>{name}</span>
                        <span className="font-semibold truncate">{mainText}</span>
                    </div>
                    {subtext && (
                        <div className="flex items-center text-sm text-gray-500 mt-0.5">
                            <span>{subtext}</span>
                        </div>
                    )}  
                </div>

            </Row>
        )
    }
    function renderEventPricingRow(eventEntry: Events) {
        let mainText = `$${eventEntry.entry} for first class`
        let subText = `$${eventEntry.additional} each additional class`
        return renderPricingRow(eventEntry.icon, eventEntry.id, eventEntry.name, mainText, subText)
    }

    return (
        <Column className={className} style={{ maxWidth: width, width, ...style}}>
            <div key="events-header">
                <Row className="flex items-center justify-between gap-2 w-full" gap={1}>
                    <h1 className="text-2xl font-bold text-center underline">
                        <i className="fa-solid fa-dollar-sign mr-4"></i>Pricing
                    </h1>
                </Row>
            </div>
            {renderEventPricingRow(events.weeknights)}
            {renderEventPricingRow(events.weekends)}
            {renderPricingRow("fa-solid fa-hourglass", "transponder", "Transponders", `available for $${products.transponder.price} each.`)}
        </Column>
    )
}
