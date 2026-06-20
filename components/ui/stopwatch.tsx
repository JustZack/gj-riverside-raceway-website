import React, { useEffect, useState } from 'react';

export type StopwatchVariant = 'clock' | 'pill' | 'bar';

interface StopwatchProps {
  remainingMs: number;
  totalMs: number;
  variant?: StopwatchVariant;
  size?: number;
  style?: React.CSSProperties;
}

export default function Stopwatch({
  remainingMs,
  totalMs,
  variant = 'clock',
  size = 84,
  style = {},
}: StopwatchProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const raf = requestAnimationFrame(() => setHasMounted(true));
    return () => cancelAnimationFrame(raf);
  }, []);

  const secondsLeft = Math.max(0, Math.ceil(remainingMs / 1000));
  const safeTotal = Math.max(1, totalMs);
  const progress = Math.max(0, Math.min(1, remainingMs / safeTotal));
  const fadeWindowMs = Math.min(1000, safeTotal);
  const fadeOutOpacity = Math.max(0, Math.min(1, remainingMs / fadeWindowMs));
  const opacity = (hasMounted ? 1 : 0) * fadeOutOpacity;

  if (variant === 'pill') {
    return (
      <div
        style={{
          padding: '8px 14px',
          borderRadius: 999,
          backgroundColor: 'rgba(10, 10, 10, 0.62)',
          color: '#fff',
          fontSize: 20,
          fontWeight: 800,
          letterSpacing: 0.5,
          lineHeight: 1,
          opacity,
          transition: 'opacity 220ms ease',
          pointerEvents: 'none',
          userSelect: 'none',
          ...style,
        }}
      >
        {secondsLeft}s
      </div>
    );
  }

  if (variant === 'bar') {
    return (
      <div
        style={{
          width: 140,
          padding: '10px 12px',
          borderRadius: 12,
          backgroundColor: 'rgba(10, 10, 10, 0.62)',
          color: '#fff',
          opacity,
          transition: 'opacity 220ms ease',
          pointerEvents: 'none',
          userSelect: 'none',
          ...style,
        }}
      >
        <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6, textAlign: 'center' }}>
          {secondsLeft}s
        </div>
        <div style={{ height: 7, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.28)' }}>
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              borderRadius: 999,
              backgroundColor: '#ffffff',
              transition: 'width 100ms linear',
            }}
          />
        </div>
      </div>
    );
  }

  const clockSize = Math.max(40, size);
  const stroke = Math.max(3, Math.round(clockSize * 0.07));
  const centerFontSize = Math.max(14, Math.round(clockSize * 0.33));
  const radius = (clockSize - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - progress);

  return (
    <div
      style={{
        width: clockSize,
        height: clockSize,
        borderRadius: '50%',
        backgroundColor: 'rgba(10, 10, 10, 0.62)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        opacity,
        transition: 'opacity 220ms ease',
        pointerEvents: 'none',
        userSelect: 'none',
        ...style,
      }}
    >
      <svg
        width={clockSize}
        height={clockSize}
        viewBox={`0 0 ${clockSize} ${clockSize}`}
        style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
        aria-hidden="true"
      >
        <circle
          cx={clockSize / 2}
          cy={clockSize / 2}
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.28)"
          strokeWidth={stroke}
        />
        <circle
          cx={clockSize / 2}
          cy={clockSize / 2}
          r={radius}
          fill="none"
          stroke="#ffffff"
          strokeWidth={stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          strokeLinecap="round"
        />
      </svg>
      <div style={{ color: '#fff', fontSize: centerFontSize, fontWeight: 800, lineHeight: 1 }}>
        {secondsLeft}
      </div>
    </div>
  );
}