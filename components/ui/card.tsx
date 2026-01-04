import React from 'react'
import Image from 'next/image'

type CardProps = {
  children: React.ReactNode
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  className?: string
  backgroundImage?: string
  backgroundBlur?: number
  backgroundImageLinearGradientStart?: number
  backgroundImageLinearGradientEnd?: number
  style?: React.CSSProperties
  shadow?: boolean
}

export default function Card({ 
  children, 
  backgroundColor = '#ffffff', 
  borderColor = '#e5e7eb',
  borderWidth = 1,
  className = '',
  borderRadius = 5,
  backgroundImage,
  backgroundBlur = 0,
  backgroundImageLinearGradientStart = 0.8,
  backgroundImageLinearGradientEnd = 0.2,
  style = {},
  shadow = true
}: CardProps) {
  // Convert hex color to rgba for overlay
  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  function startBackgroundImageGradient() {
    return hexToRgba(backgroundColor, backgroundImageLinearGradientStart || 0.8)
  }
  function endBackgroundImageGradient() {
    return hexToRgba(backgroundColor, backgroundImageLinearGradientEnd || 0.7)
  }

  return (
    <div 
      className={`p-4 rounded h-full flex flex-col relative overflow-hidden ${shadow ? 'shadow-lg' : ''} ${className}`}
      style={{ 
        backgroundColor: backgroundImage ? 'transparent' : backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        ...style
      }}
    >
      {backgroundImage && (
        <>
          {/* Optimized background image with next/image */}
          <div className="absolute inset-0 -z-20 w-full h-full">
            <Image
              src={backgroundImage} alt="Card background" fill
              style={{ objectFit: 'cover', filter: `blur(${backgroundBlur}px)` }}
              priority sizes="100vw"
            />
          </div>
          {/* Overlay gradient for color blending */}
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: `linear-gradient(${startBackgroundImageGradient()}, ${endBackgroundImageGradient()})`,
              borderRadius: `${borderRadius}px`
            }}
          />
        </>
      )}
      {children}
    </div>
  )
}