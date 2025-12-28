'use client'

import Row from '@/components/ui/row'
import Image from 'next/image'

export default function SiteHeader() {
    return (
        <Row fullWidth shadowBottom className="p-4 z-50" style={{ backgroundColor: "#ffffff" }}>
            <Image src="/images/gjrsr-logo-white-bg-transparent.png" alt="Site Logo" width={150} height={50} />
        </Row>
    )
}