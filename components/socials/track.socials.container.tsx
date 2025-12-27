'use client'

import SocialCard from '@/components/socials/social.card'
import Row from '@/components/ui/row'

export default function TrackSocialsContainer() {
    const socials = [
        {
            name: "Facebook",
            url: "https://www.facebook.com/share/g/1bRsCDdtpa/",
            urlText: "Visit our Facebook Page",
            textColor: "#ffffff",
            primaryColor: "#3b5998",
            backgroundColor: "#000000",
            imageSrc: "/images/facebook.png",
            buttonIcon: "fa-brands fa-facebook fa-xl",
            buttonText: "GV RC Oval Racing",
            description: "Join the conversation and stay updated with the latest news!",
            backgroundImage: "/images/gv-rc-oval.jpg",
        }, {
            name: "Youtube",
            url: "https://www.youtube.com/@gjriversideraceway",
            urlText: "Visit our Youtube Channel",
            primaryColor: "#ff0000",
            backgroundColor: "#dfe3ee",
            imageSrc: "/images/youtube.png",
            buttonIcon: "fa-brands fa-youtube fa-xl",
            buttonText: "@GJRiversideRaceway",
            description: "See live & recorded racing action on our Youtube channel!",
        }, {
            name: "LiveTime RC",
            url: "https://jjsraceway.liverc.com/",
            urlText: "Visit our LiveTime RC Page",
            primaryColor: "#ff0000",
            backgroundColor: "#000000",
            imageSrc: "/images/livetimerc.png",
            buttonIcon: "fa-solid fa-clock fa-xl",
            buttonText: "Visit LiveTime RC",
            description: "See live & recorded racing action on our LiveTime RC page!",
            backgroundImage: "/images/jjs-raceway.png",
        }
    ]

    return (
        <div className="text-center">
            <Row align="center" justify="center">
                <h2 className="text-2xl font-bold my-4">Connect with Us</h2>
            </Row>
            <Row collapsible gap={4} align="center" justify="center" equalHeight>
                {socials.map((social) => (
                    <SocialCard key={social.name} social={social} />
                ))}
            </Row>
        </div>
    )
}
