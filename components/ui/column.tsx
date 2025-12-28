import React from 'react'

type ColumnProps = {
  children: React.ReactNode
  gap?: number
  collapsible?: boolean
  align?: 'start' | 'center' | 'end' | 'stretch'
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'
  equalWidth?: boolean
  fullHeight?: boolean
  className?: string
  style?: React.CSSProperties
  shadowTop?: boolean
  shadowBottom?: boolean
  shadowLeft?: boolean
  shadowRight?: boolean
}

export default function Column({
  children,
  gap = 4,
  collapsible = false,
  align = 'stretch',
  justify = 'start',
  equalWidth = false,
  fullHeight = false,
  className = '',
  style = {},
  shadowTop = false,
  shadowBottom = false,
  shadowLeft = false,
  shadowRight = false
}: ColumnProps) {
  // Map align prop to Tailwind classes (for horizontal alignment)
  const alignClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    stretch: 'justify-stretch'
  }

  // Map justify prop to Tailwind classes (for vertical alignment)
  const justifyClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    between: 'items-between',
    around: 'items-around',
    evenly: 'items-evenly'
  }

  // Map gap to Tailwind classes
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

  // Equal width: use justify-stretch and children need w-full
  const widthClass = equalWidth ? 'justify-stretch' : alignClasses[align]

  // Get gap class or use inline style as fallback
  const gapClass = gapClasses[gap as keyof typeof gapClasses] || ''

  // Base classes
  const baseClasses = `flex flex-col ${gapClass} ${!collapsible ? widthClass : ''} ${justifyClasses[justify]} ${fullHeight ? 'h-full max-h-full' : ''}`

  // Collapsible: flex-col with wrap on desktop, flex-row on mobile
  // When collapsed (mobile), center items vertically
  const responsiveClasses = collapsible
    ? `flex-row items-center md:flex-col md:flex-wrap md:${widthClass}`
    : 'flex-col'

  // Shadow classes
  const shadowClasses = [
    shadowTop ? 'shadow-[0_-8px_16px_-8px_rgba(0,0,0,0.15)]' : '',
    shadowBottom ? 'shadow-[0_8px_16px_-8px_rgba(0,0,0,0.15)]' : '',
    shadowLeft ? 'shadow-[-8px_0_16px_-8px_rgba(0,0,0,0.15)]' : '',
    shadowRight ? 'shadow-[8px_0_16px_-8px_rgba(0,0,0,0.15)]' : '',
  ].join(' ')

  return (
    <div
      className={`${baseClasses} ${responsiveClasses} ${shadowClasses} ${className}`}
      style={!gapClass ? { gap: `${gap * 0.25}rem`, ...style } : style}
    >
      {equalWidth
        ? React.Children.map(children, (child) => (
            <div className="flex w-full">{child}</div>
          ))
        : children
      }
    </div>
  )
}