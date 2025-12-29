'use client'
import { useState, useEffect, useCallback } from 'react'
import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import Row from '@/components/ui/row'
import Card from '@/components/ui/card'

const locales = {
  'en-US': require('date-fns/locale/en-US')
}

const localizer = dateFnsLocalizer({ format, parse, startOfWeek, getDay, locales })

export default function TrackScheduleCalendar() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])
  const [selectedEvent, setSelectedEvent] = useState<ScheduleEvent | null>(null)
  const [popupPosition, setPopupPosition] = useState<{ x: number; y: number } | null>(null)

  useEffect(TrackScheduleUtils.fetchAndFormatEvents.bind(null, setEvents), [])

  const handleSelectEvent = useCallback((event: ScheduleEvent, e: React.SyntheticEvent) => {}, [])

  const handleClosePopup = useCallback(() => {}, [])

  const eventStyleGetter = (event: ScheduleEvent) => {
    return {
      style: {
        backgroundColor: event.statusColor,
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
    <Card>
      <Row fullWidth>
        <h1 className="text-2xl font-bold text-center">Race Calendar</h1>
      </Row>
      <Row fullWidth>
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
          views={['month', 'week']}
          defaultView="month"
          style={{ height: 600, width: '100%' }}
        />
      </Row>
    </Card>
  )
}
