
import React, { useEffect, useRef, useState, ReactNode } from 'react';
import Stopwatch, { StopwatchVariant } from './stopwatch';

interface CarouselProps {
  children: ReactNode[];
  interval?: number; // ms
  intervals?: number[]; // ms per slide
  showTimeLeft?: boolean;
  timeLeftVariant?: StopwatchVariant;
  timeLeftSize?: number;
  transitionDuration?: number; // ms
  className?: string;
  style?: React.CSSProperties;
}

export function Carousel({
  children,
  interval = 6000,
  intervals,
  showTimeLeft = true,
  timeLeftVariant = 'clock',
  timeLeftSize = 64,
  transitionDuration = 600,
  className = '',
  style = {},
}: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [remainingMs, setRemainingMs] = useState(interval);
  const slideEndAtRef = useRef<number>(Date.now() + interval);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const slideRef = useRef<HTMLDivElement>(null);
  const count = children.length;
  const slideIntervalMs = intervals?.[current] ?? interval;

  // Auto-slide
  useEffect(() => {
    if (count <= 1 || isSliding) return;
    slideEndAtRef.current = Date.now() + slideIntervalMs;
    setRemainingMs(slideIntervalMs);
    const intv = setTimeout(() => {
      setDirection('left');
      setIsSliding(true);
    }, slideIntervalMs);
    return () => clearTimeout(intv);
  }, [count, isSliding, slideIntervalMs]);

  // Countdown in whole seconds for the current slide
  useEffect(() => {
    if (!showTimeLeft || count <= 1 || isSliding) return;
    const tickMs = 100;
    const timer = setInterval(() => {
      setRemainingMs(Math.max(0, slideEndAtRef.current - Date.now()));
    }, tickMs);
    return () => clearInterval(timer);
  }, [showTimeLeft, count, isSliding, current, slideIntervalMs]);

  // Handle transition
  useEffect(() => {
    if (isSliding) {
      timeoutRef.current = setTimeout(() => {
        setCurrent((prev) => (prev + 1) % count);
        setIsSliding(false);
      }, transitionDuration);
    }
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isSliding, count, transitionDuration]);

  // For seamless loop, duplicate first and last slide
  const getSlides = () => {
    if (count <= 1) return children;
    // [last, 0, 1, ..., n-1, 0]
    const slides = [children[count - 1], ...children, children[0]];
    return slides;
  };

  // Calculate translateX
  const slideIndex = isSliding ? current + 2 : current + 1;
  // When not sliding, always show the current slide (offset by 1 for the prepended last slide)

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        ref={slideRef}
        style={{
          display: 'flex',
          width: `${(count + 2) * 100}%`,
          height: '100%',
          transform: `translateX(-${slideIndex * (100 / (count + 2))}%)`,
          transition: isSliding
            ? `transform ${transitionDuration}ms cubic-bezier(.77,0,.18,1)`
            : 'none',
        }}
        onTransitionEnd={() => {
          // If we just looped from last to first, reset without animation
          if (current === count && isSliding) {
            setCurrent(0);
            setIsSliding(false);
          }
        }}
      >
        {getSlides().map((child, i) => (
          <div
            key={i}
            style={{
              width: `${100 / (count + 2)}%`,
              height: '100%',
              flexShrink: 0,
              flexGrow: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {child}
          </div>
        ))}
      </div>
      {showTimeLeft && count > 1 && (
        <Stopwatch
          remainingMs={remainingMs}
          totalMs={slideIntervalMs}
          variant={timeLeftVariant}
          size={timeLeftSize}
          style={{ position: 'absolute', right: 14, bottom: 14, zIndex: 2 }}
        />
      )}
    </div>
  );
}
