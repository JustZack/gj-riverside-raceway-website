'use client'
import Image from 'next/image'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

type Social = {
    name: string,
    url: string,
    urlText: string,
    imageSrc: string,
    description: string,
    primaryColor: string,
    backgroundColor: string,
    buttonIcon: IconDefinition
    buttonText: string
}

export default function SocialCard({ social }: { social: Social }) {
  const CARD_WIDTH = 300
  const CARD_HEIGHT = 215

  return (
    <div style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`, flexShrink: 0 }}>
      <Card 
        backgroundColor={social.backgroundColor}
        borderColor={social.primaryColor}
        borderWidth={2}
      >
        <Image 
          src={social.imageSrc} 
          alt={social.name} 
          width={CARD_WIDTH} 
          height={0}
          className="w-full h-auto mb-2" 
        />
        <p className="mb-4 flex-grow overflow-auto" style={{ color: social.primaryColor }}>
          {social.description}
        </p>
        <Button text={social.buttonText} icon={social.buttonIcon}
          textColor="#ffffff"               backgroundColor={social.primaryColor} borderColor={social.primaryColor}
          hoverTextColor={social.primaryColor}  hoverBackgroundColor="#ffffff"   hoverBorderColor={social.primaryColor}
          onClick={() => window.open(social.url, '_blank')}
          />
      </Card>
    </div>
  )
}