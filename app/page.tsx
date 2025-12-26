'use client'

import API from '@/lib/api/api'
import SocialCard from '@/components/socials/social.card'
import Row from '@/components/ui/row'
import { useState, useEffect } from 'react'
import {faFacebook, faYoutube} from '@fortawesome/free-brands-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

export default function Home() {
    const [scheduleTypes, setScheduleTypes] = useState<any[]>([])
    const [loading, setLoading] = useState(true)

    const socials = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/share/g/1bRsCDdtpa/",
            urlText: "Visit our Facebook Page",
            primaryColor: "#3b5998",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/facebook-logo.png",
            buttonIcon: faFacebook,
            buttonText: "Visit our Facebook Page",
            description: "Stay connected with us on Facebook for the latest updates and events!"
        }, {
            name: "Youtube",
            url: "https://www.youtube.com/@gjriversideraceway",
            urlText: "Visit our Youtube Channel",
            primaryColor: "#ff0000",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/youtube-logo.png",
            buttonIcon: faYoutube,
            buttonText: "See our Youtube Channel",
            description: "See live & recorded racing action on our Youtube channel!"
        }, {
            name: "LiveTime RC",
            url: "https://jjsraceway.liverc.com/",
            urlText: "Visit our LiveTime RC Page",
            primaryColor: "#ff0000",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/livetimerc-logo.png",
            buttonIcon: faClock,
            buttonText: "Visit LiveTime RC",
            description: "See live & recorded racing action on our LiveTime RC page!"
        }
    ]

    useEffect(() => {
        API.getSchedule().then((data) => {
            setScheduleTypes(data)
            setLoading(false)
        }).catch((error) => {
            console.error('Error fetching schedules:', error)
            setLoading(false)
        });
    }, [])

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
            <div className="mt-8">
                {loading 
                    ? (<span>Loading schedule...</span>) 
                    : (
                    <div>
                        <h2 className="text-2xl font-semibold mb-4">Track Schedule:</h2>
                        <ul className="space-y-2">
                        {scheduleTypes?.map((track) => (
                            <li key={track.id} className="text-lg">
                            <strong>{track.name}</strong>
                            {track.description && (
                                <span className="text-gray-500"> - {track.description}</span>
                            )}
                            </li>
                        ))}
                        </ul>
                    </div>
                    )
                }
            </div>
            </div>
        </main>
    )
}
