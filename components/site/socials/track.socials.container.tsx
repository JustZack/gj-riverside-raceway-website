'use client'

import SocialCard from '@/components/site/socials/social.card'
import Row from '@/components/ui/row'
import { socials } from '@/content/content'

export default function TrackSocialsContainer() {
    return (
        <div>
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
