import React from 'react'

type CardProps = {
  children: React.ReactNode
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  className?: string
}

export default function Card({ 
  children, 
  backgroundColor = '#ffffff', 
  borderColor = '#e5e7eb',
  borderWidth = 1,
  className = '',
  borderRadius = 10
}: CardProps) {
  return (
    <div 
      className={`p-4 rounded h-full flex flex-col ${className}`}
      style={{ 
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`
      }}
    >
      {children}
    </div>
  )
}