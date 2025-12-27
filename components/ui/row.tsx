import React from 'react'

type RowProps = {
  children: React.ReactNode
  gap?: number
  collapsible?: boolean
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  equalHeight?: boolean
  fullWidth?: boolean
  className?: string
}

export default function Row({ 
  children, 
  gap = 4,
  collapsible = false,
  align = 'stretch',
  justify = 'start',
  equalHeight = false,
  fullWidth = false,
  className = ''
}: RowProps) {
  // Map align prop to Tailwind classes
  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  // Map justify prop to Tailwind classes
  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  // Map gap to complete Tailwind classes
  const gapClasses = {
    0: 'gap-0',
    1: 'gap-1',
    2: 'gap-2',
    3: 'gap-3',
    4: 'gap-4',
    5: 'gap-5',
    6: 'gap-6',
    8: 'gap-8',
    10: 'gap-10',
    12: 'gap-12',
    16: 'gap-16'
  }

  // Equal height: use items-stretch and children need h-full
  const heightClass = equalHeight ? 'items-stretch' : alignClasses[align]

  // Get gap class or use inline style as fallback
  const gapClass = gapClasses[gap as keyof typeof gapClasses] || ''

  // Base classes
  const baseClasses = `flex ${gapClass} ${heightClass} ${justifyClasses[justify]} ${fullWidth ? 'w-full' : ''}`
  
  // Collapsible: flex-row on desktop, flex-col on mobile
  // When collapsed (mobile), center items horizontally
  const responsiveClasses = collapsible 
    ? 'flex-col items-center md:flex-row md:items-stretch' 
    : 'flex-row'

  return (
    <div 
      className={`${baseClasses} ${responsiveClasses} ${className}`}
      style={!gapClass ? { gap: `${gap * 0.25}rem` } : undefined}
    >
      {equalHeight 
        ? React.Children.map(children, (child) => (
            <div className="flex h-full">{child}</div>
          ))
        : children
      }
    </div>
  )
}