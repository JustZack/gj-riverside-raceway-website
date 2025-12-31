'use client'

import { Row, Column } from '@/components/ui/ui'
import { footer } from '@/content/content'

export default function SiteFooter() {
    function renderFooterColumn(items: { icon: string; text: string; link?: string }[]) {
        return items.map((item, index) => (
            <span key={index}>
                <i className={`${item.icon} mr-2`}></i>
                {item.link ? (
                    <a href={item.link} className="text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                        {item.text}
                    </a>
                ) : (
                    <>{item.text}</>
                )}
            </span>
        ))
    }

    return (
        <Row collapsible fullWidth shadowTop justify="center" align="center" className="py-8" style={{ backgroundColor: "#ffffff" }}>
            {footer.map((footerItems, index) => (
                <Column className="px-2" key={index} align="center" style={{width: '375px' }}>
                    {renderFooterColumn(footerItems.items)}
                </Column>
            ))}
        </Row>
    )
}