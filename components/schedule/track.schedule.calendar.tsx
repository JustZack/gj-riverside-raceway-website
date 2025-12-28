'use client'
import { useState, useEffect, useCallback } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import API from '@/lib/api/api'
import TrackEventUtils from '@/lib/utils/track.schedule.utils'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

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

export default function TrackScheduleCalendar() {
  const [events, setEvents] = useState<CalendarEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null)

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
        status: TrackEventUtils.getEventStatus(event)
      }))
      // Only show the first event
      setEvents(formattedEvents.length > 0 ? [formattedEvents[0]] : [])
    }).catch((error) => {
      console.error('Error fetching schedule data:', error)
    })
  }, [])

  const handleSelectEvent = useCallback((event: CalendarEvent, e: React.SyntheticEvent) => {}, [])

  const handleClosePopup = useCallback(() => {}, [])

  const eventStyleGetter = (event: CalendarEvent) => {
    let backgroundColor = TrackEventUtils.getEventStatusColor(event)

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
    </div>
  )
}
