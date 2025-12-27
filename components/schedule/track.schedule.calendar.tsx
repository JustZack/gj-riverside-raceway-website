'use client'
import { useState, useEffect, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import API from '@/lib/api/api'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

interface CalendarEvent extends Event {
  id: number
  title: string
  start: Date
  end: Date
  cancelled: boolean
  description?: string
  liveTimeEvent?: {
    id: number
    entries?: number
    drivers?: number
    laps?: number
  }
  status: 'cancelled' | 'finished' | 'upcoming' | 'running'
}

interface EventPopupProps {
  event: CalendarEvent | null
  position: { x: number; y: number } | null
  onClose: () => void
}

function EventPopup({ event, position, onClose }: EventPopupProps) {
  if (!event || !position) return null

  const liveTimeLink = event.liveTimeEvent 
    ? `https://jjsraceway.liverc.com/results/?p=view_event&id=${event.liveTimeEvent.id}`
    : null

  return (
    <>
      <div 
        className="fixed inset-0 z-40"
        onClick={onClose}
      />
      <div 
        className="absolute bg-white rounded-lg shadow-2xl border-2 border-gray-200 p-5 z-50"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          maxWidth: '400px',
          minWidth: '320px'
        }}
      >
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold pr-4">{event.title}</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-xl leading-none flex-shrink-0"
          >
            &times;
          </button>
        </div>

        <div className="space-y-2 text-sm">
          <div>
            <span className="font-semibold">Start:</span>{' '}
            {format(event.start, 'PPpp')}
          </div>
          <div>
            <span className="font-semibold">End:</span>{' '}
            {format(event.end, 'PPpp')}
          </div>

          {event.description && (
            <div>
              <span className="font-semibold">Description:</span>{' '}
              {event.description}
            </div>
          )}

          <div>
            <span className={`px-2 py-1 rounded text-xs ${
              event.cancelled ? 'bg-red-100 text-red-800' :
              event.status === 'finished' ? 'bg-green-100 text-green-800' :
              event.status === 'running' ? 'bg-gray-300 text-gray-900' :
              'bg-blue-100 text-blue-800'
            }`}>
              {event.status}
            </span>
          </div>

          {event.liveTimeEvent && (
            <div className="border-t pt-2 mt-2">
              <div className="font-semibold mb-1">Race Statistics</div>
              {event.liveTimeEvent.entries && (
                <div>Entries: {event.liveTimeEvent.entries}</div>
              )}
              {event.liveTimeEvent.drivers && (
                <div>Drivers: {event.liveTimeEvent.drivers}</div>
              )}
              {event.liveTimeEvent.laps && (
                <div>Laps: {event.liveTimeEvent.laps}</div>
              )}
            </div>
          )}

          {liveTimeLink && (
            <div className="pt-2">
              <a 
                href={liveTimeLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700 text-xs"
              >
                <i className="fa-solid fa-arrow-up-right-from-square mr-1"></i>
                View on LiveRC
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default function TrackScheduleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null)

  function determineStatus(event: any): 'cancelled' | 'finished' | 'upcoming' | 'running' {
    if (event.cancelled) return 'cancelled'
    else if (new Date(event.end) < new Date()) return 'finished'
    else if (new Date(event.start) <= new Date()) return 'running'
    else return 'upcoming'
  }

  useEffect(() => {
    API.getSchedule().then((data) => {
      const formattedEvents: CalendarEvent[] = data.map((event: any) => ({
        id: event.id,
        title: event.name,
        start: new Date(event.start),
        end: new Date(event.end),
        cancelled: event.cancelled,
        description: event.description,
        liveTimeEvent: event.liveTimeEvent,
        status: determineStatus(event)
      }))
      setEvents(formattedEvents)
    }).catch((error) => {
      console.error('Error fetching schedule data:', error)
    })
  }, [])

  const handleSelectEvent = useCallback((event: CalendarEvent, e: React.SyntheticEvent) => {
    const target = e.target as HTMLElement
    const rect = target.getBoundingClientRect()
    
    const popupWidth = 400
    const popupHeight = 300 // Approximate height
    const offset = 8 // Gap between event and popup
    
    // Determine if we should position on left or right side
    const spaceOnRight = window.innerWidth - rect.right
    const spaceOnLeft = rect.left
    
    // Determine if we should position above or below
    const spaceBelow = window.innerHeight - rect.bottom
    const spaceAbove = rect.top
    
    let x, y
    
    // Horizontal positioning - center popup horizontally with the event if possible
    x = rect.left + window.scrollX
    
    // If popup would go off right edge, align right edges instead
    if (rect.left + popupWidth > window.innerWidth) {
      x = rect.right + window.scrollX - popupWidth
    }
    
    // Vertical positioning
    if (spaceBelow >= popupHeight + offset) {
      // Position below the event
      y = rect.bottom + window.scrollY + offset
    } else if (spaceAbove >= popupHeight + offset) {
      // Position above the event
      y = rect.top + window.scrollY - popupHeight - offset
    } else {
      // Not enough space either way, just show below
      y = rect.bottom + window.scrollY + offset
    }
    
    setPopupPosition({ x, y })
    setSelectedEvent(event)
  }, [])

  const handleClosePopup = useCallback(() => {
    setSelectedEvent(null)
    setPopupPosition(null)
  }, [])

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = '#3b82f6' // blue for upcoming
    
    if (event.cancelled) {
      backgroundColor = '#ef4444' // red
    } else if (event.status === 'finished') {
      backgroundColor = '#22c55e' // green
    } else if (event.status === 'running') {
      backgroundColor = '#6b7280' // gray
    }

    return {
      style: {
        backgroundColor,
        borderRadius: '4px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block'
      }
    }
  }

  const dayPropGetter = useCallback((date: Date) => {
    // Check if this date has any events
    const dateStr = format(date, 'yyyy-MM-dd')
    const hasEvent = events.some(event => {
      const eventDateStr = format(event.start, 'yyyy-MM-dd')
      return eventDateStr === dateStr
    })

    if (!hasEvent) {
      return {
        style: {
          backgroundColor: '#f3f4f6',
        }
      }
    }
    return {}
  }, [events])

  const CustomDateCellWrapper = ({ children, value }: any) => {
    const dateStr = format(value, 'yyyy-MM-dd')
    const hasEvent = events.some(event => {
      const eventDateStr = format(event.start, 'yyyy-MM-dd')
      return eventDateStr === dateStr
    })

    return (
      <div className="rbc-day-bg" style={{ position: 'relative' }}>
        {!hasEvent && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: '#9ca3af',
            fontSize: '12px',
            fontWeight: 'bold',
            pointerEvents: 'none',
            opacity: 0.5
          }}>
            CLOSED
          </div>
        )}
        {children}
      </div>
    )
  }

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-center">Race Calendar</h1>
      </div>
      <div style={{ height: '600px' }}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          onSelectEvent={handleSelectEvent}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          components={{
            dateCellWrapper: CustomDateCellWrapper
          }}
          views={['month']}
          defaultView="month"
        />
      </div>
      <EventPopup 
        event={selectedEvent}
        position={popupPosition}
        onClose={handleClosePopup}
      />
    </div>
  )
}
