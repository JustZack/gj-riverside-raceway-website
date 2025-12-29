'use client'
import { useState, useEffect, useCallback } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'
import Row from '@/components/ui/row'
import Card from '@/components/ui/card'
import { EventSourceInput } from '@fullcalendar/core/index.js'

export default function TrackScheduleCalendarNew() {
  const [events, setEvents] = useState<ScheduleEvent[]>([])

  useEffect(TrackScheduleUtils.fetchAndFormatEvents.bind(null, setEvents), [])

    function renderEventContent(eventInfo: any) {
    return (<i>{eventInfo.event.title}</i>)
    }

  /*return (
    <Card shadow>
      <Row fullWidth>
        <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={events}
        />
      </Row>
    </Card>
  )*/
}
