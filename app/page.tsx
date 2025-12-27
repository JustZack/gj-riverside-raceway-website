'use client'

import API from '@/lib/api/api'
import SocialCard from '@/components/socials/social.card'
import Row from '@/components/ui/row'
import TrackScheduleTable from '@/components/schedule/track.schedule.table'
import { useState, useEffect } from 'react'

export default function Home() {
    const socials = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/share/g/1bRsCDdtpa/",
            urlText: "Visit our Facebook Page",
            primaryColor: "#3b5998",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/facebook.png",
            buttonIcon: "fa-brands fa-facebook fa-xl",
            buttonText: "Visit our Facebook Page",
            description: "Stay connected with us on Facebook for the latest updates and events!"
        }, {
            name: "Youtube",
            url: "https://www.youtube.com/@gjriversideraceway",
            urlText: "Visit our Youtube Channel",
            primaryColor: "#ff0000",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/youtube.png",
            buttonIcon: "fa-brands fa-youtube fa-xl",
            buttonText: "See our Youtube Channel",
            description: "See live & recorded racing action on our Youtube channel!"
        }, {
            name: "LiveTime RC",
            url: "https://jjsraceway.liverc.com/",
            urlText: "Visit our LiveTime RC Page",
            primaryColor: "#ff0000",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/livetimerc.png",
            buttonIcon: "fa-solid fa-clock fa-xl",
            buttonText: "Visit LiveTime RC",
            description: "See live & recorded racing action on our LiveTime RC page!"
        }
    ]

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-24">
            <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">
                    Hello World
                </h1>
                <p className="text-xl text-gray-600">
                    Welcome to GJ Riverside Raceway Website
                </p>
                
                <Row collapsible gap={4} align="center" justify="center" equalHeight>
                    {socials.map((social) => (
                        <SocialCard key={social.name} social={social} />
                    ))}
                </Row>
                <TrackScheduleTable />
            </div>
        </main>
    )
}
