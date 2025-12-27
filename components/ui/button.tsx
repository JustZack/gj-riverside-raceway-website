'use client'
import React from 'react'

type ButtonProps = {
  text: string
  onClick?: () => void
  icon?: string  // Change to string like "fa-solid fa-plus"
  iconPosition?: 'left' | 'right'
  backgroundColor?: string
  textColor?: string
  borderColor?: string
  hoverBackgroundColor?: string
  hoverTextColor?: string
  hoverBorderColor?: string
  borderWidth?: number
  borderRadius?: string
  className?: string
  disabled?: boolean
}

export default function Button({
  text,
  onClick,
  icon,
  iconPosition = 'left',
  backgroundColor = '#3b82f6',
  textColor = '#ffffff',
  borderColor = '#3b82f6',
  hoverBackgroundColor = '#2563eb',
  hoverTextColor = '#ffffff',
  hoverBorderColor = '#2563eb',
  borderWidth = 1,
  borderRadius = '0.375rem',
  className = '',
  disabled = false
}: ButtonProps) {
  const [isHovered, setIsHovered] = React.useState(false)

  const buttonStyle = {
    backgroundColor: isHovered ? hoverBackgroundColor : backgroundColor,
    color: isHovered ? hoverTextColor : textColor,
    border: `${borderWidth}px solid ${isHovered ? hoverBorderColor : borderColor}`,
    borderRadius,
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.5 : 1,
    transition: 'all 0.2s ease-in-out'
  }

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      className={`px-4 py-2 font-medium inline-flex items-center gap-2 ${className}`}
      style={buttonStyle}
    >
      {icon && iconPosition === 'left' && (
        <i className={icon}></i>
      )}
      <span>{text}</span>
      {icon && iconPosition === 'right' && (
        <i className={icon}></i>
      )}
    </button>
  )
}