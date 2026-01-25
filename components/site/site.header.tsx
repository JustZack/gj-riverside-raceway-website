'use client'

import Image from 'next/image'
import { Row } from '@/components/ui/ui'
import { header } from '@/content/content'

export default function SiteHeader() {
    let logos = Array.isArray(header.logo) ? header.logo : [header.logo];


    function renderLogo(logo: any, index: number) {
        return (<Image key={index} src={logo.src} alt={logo.alt} width={logo.width} height={logo.height}/>);
    }

    return (
        <Row fullWidth shadowBottom className="p-4 z-50" align='center' justify='center' style={{ backgroundColor: "#ffffff" }}>
            {logos.map(renderLogo)}
        </Row>
    )
}