'use client'

import Row from '@/components/ui/row'
import Column from '@/components/ui/column'

export default function SiteFooter() {

    const footerColumns = [
        {
            className: 'items-end pr-8',
            items: [
                {
                    icon: 'fas fa-map-marker-alt',
                    text: '801 kimball Avenue, Grand Junction, Colorado 81501'
                }, {
                    icon: 'fas fa-phone',
                    text: '970-243-2305'
                }
            ]
        },
        {
            className: 'items-start pl-8',
            items: [
                {
                    icon: 'fas fa-copyright',
                    text: `${new Date().getFullYear()} GJ Riverside Raceway. All rights reserved.`
                }, {
                    icon: 'fas fa-desktop',
                    text: 'Website by Zack Jones'
                }
            ]
        }
    ]

    function renderFooterColumn(items: { icon: string; text: string }[]) {
        return items.map((item, index) => (
            <span key={index}>
                <i className={`${item.icon} mr-2`}></i>
                {item.text}
            </span>
        ))
    }

    return (
        <Row fullWidth shadowTop justify="center" align="center" className="py-8" style={{ backgroundColor: "#ffffff" }}>
            {footerColumns.map((footerItems, index) => (
                <Column key={index} className={footerItems.className} align="center" gap={2}>
                    {renderFooterColumn(footerItems.items)}
                </Column>
            ))}
        </Row>
    )
}