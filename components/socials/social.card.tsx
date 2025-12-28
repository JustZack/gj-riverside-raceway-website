'use client'
import Image from 'next/image'
import Card from '@/components/ui/card'
import Button from '@/components/ui/button'

type Social = {
    name: string,
    url: string,
    urlText: string,
    imageSrc: string,
    description: string,
    primaryColor: string,
    hoverPrimaryColor?: string,
    backgroundColor: string,
    textColor?: string,
    backgroundImage?: string,
    buttonIcon: string
    buttonText: string,
    buttonTextColor?: string,
}

export default function SocialCard({ social }: { social: Social }) {
  const CARD_WIDTH = 300
  const CARD_HEIGHT = 215

  function openLinkInNewTab(social: Social) {
    window.open(social.url, '_blank')
  }

  return (
    <div style={{ width: `${CARD_WIDTH}px`, height: `${CARD_HEIGHT}px`, flexShrink: 0 }}>
      <Card 
        backgroundColor={social.backgroundColor}
        borderColor={social.primaryColor}
        borderWidth={2}
        backgroundImage={social.backgroundImage}
        backgroundBlur={social.backgroundImage ? 1 : 0}
      >
        <Image 
          src={social.imageSrc} 
          alt={social.name} 
          width={CARD_WIDTH} 
          height={0}
          className="w-full h-auto mb-2"
        />
        <p className="mb-4 flex-grow overflow-auto" style={{ color: social.textColor || "#ffffff" }}>
          {social.description}
        </p>
        <Button icon={social.buttonIcon} onClick={() => openLinkInNewTab(social)}
          textColor={social.buttonTextColor || "#ffffff"}
          backgroundColor={social.primaryColor}
          borderColor={social.primaryColor}
          hoverTextColor={social.primaryColor}
          hoverBackgroundColor="rgba(255, 255, 255, 0.8)"
          hoverBorderColor={social.primaryColor}>
            {social.buttonText}
          </Button>
      </Card>
    </div>
  )
}