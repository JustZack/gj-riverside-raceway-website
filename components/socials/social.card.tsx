'use client'
import Image from 'next/image'
import Card from '@/components/ui/card'

type Social = {
    name: string,
    url: string,
    urlText: string,
    imageSrc: string,
    description: string,
    primaryColor: string,
    backgroundColor: string,
}

export default function SocialCard({ social }: { social: Social }) {
  const CARD_WIDTH = 300
  const CARD_HEIGHT = 200

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
        <a href={social.url} target="_blank" rel="noopener noreferrer" 
          className="underline mt-auto" style={{ color: social.primaryColor }}>
          {social.urlText}
        </a>
      </Card>
    </div>
  )
}