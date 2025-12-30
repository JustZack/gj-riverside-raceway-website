'use client'

import { Card, Banner } from '@/components/ui/ui'

export default function SiteHomeBanner() {
    const sideContent = {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderColor: 'rgba(0, 0, 0, 1)',
        textColor: 'white'
    }
    return (
        <Banner 
            style={{height: "20vw", maxHeight: "500px", minHeight: "100px"}}
            media={<img src="/images/indoor-track/losi-nascar-lineup.jpg" />}
            mediaStyle={{ objectPosition: "center 80%", objectFit: "cover", width: "100%", height: "100%", }}>
            {/* Position the card at the end of the middle 50% horizontally (75% from the left, vertically centered) */}
            {/*
            <div className="absolute top-1/2 left-[75%] -translate-y-1/2 -translate-x-1/2 z-10" style={{width: 'max-content'}}>
                <Card 
                    style={{height: "150px", color: sideContent.textColor}} 
                    backgroundColor={sideContent.backgroundColor}
                    borderColor={sideContent.borderColor}
                    className="p-4 flex flex-col justify-center items-center">
                    <h1>JJ's Raceway Track Schedule</h1>
                    <p>Stay updated with our latest events and races!</p>
                </Card>
            </div>
            */}
        </Banner>
    )
}