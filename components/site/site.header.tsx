'use client'

import Image from 'next/image'
import { Row } from '@/components/ui/ui'
import { header } from '@/content/content'

export default function SiteHeader() {
    return (
        <Row fullWidth shadowBottom className="p-4 z-50" style={{ backgroundColor: "#ffffff" }}>
            <Image src={header.logo.src} alt={header.logo.alt} 
                width={header.logo.width} height={header.logo.height}/>
        </Row>
    )
}