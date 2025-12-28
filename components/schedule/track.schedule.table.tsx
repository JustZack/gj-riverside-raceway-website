'use client'
import API from '@/lib/api/api'
import Table from '@/components/ui/table/table'
import { ColumnDef } from '@/components/ui/table/types'
import Row from '@/components/ui/row'
import { useState, useEffect } from 'react'
import TrackEventUtils from '@/lib/utils/track.schedule.utils'

type ScheduleRow = {
  name: string
  liveTimeLink: string | undefined
  entries: number
  drivers: number  
  status: 'cancelled' | 'finished' | 'upcoming' | 'running'
  statusClass: string
  updatedAt: string
}

export default function TrackScheduleTable() {

  const [events, setEvents] = useState<ScheduleRow[]>([])

  useEffect(() => {
    API.getSchedule().then((data) => {
      const formattedData = data.map((event: any) => ({
        name: event.name,
        liveTimeLink: TrackEventUtils.getEventLiveTimeLink(event),
        entries: event.liveTimeEvent ? event.liveTimeEvent.entries : undefined,
        drivers: event.liveTimeEvent ? event.liveTimeEvent.drivers : undefined,
        status: TrackEventUtils.getEventStatus(event),
        statusClass: TrackEventUtils.getEventStatusClass(event),
        updatedAt: event.updatedAt
      }))
      setEvents(formattedData)
    }).catch((error) => {
      console.error('Error fetching schedule data:', error)
    });
  }, [])

  const columns: ColumnDef<ScheduleRow>[] = [
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      align: 'left',
      render: (value, row) => (
        <>
          {row.liveTimeLink ? (
            <a className="text-blue-600 hover:underline" href={row.liveTimeLink} 
              target='_blank' style={{ cursor: 'pointer' }} rel="noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square mr-1 fa-xs"></i>
              {value}
            </a>
          ) : (<>{value}</>)}
        </>
    )
    },
    {
      key: 'entries',
      header: 'Entries',
      sortable: true,
      sortType: 'numeric',
      width: '75px',
      align: 'center',
      hideOnSmall: true
    },
    {
      key: 'drivers',
      header: 'Drivers',
      sortable: true,
      sortType: 'numeric',
      align: 'center',
      hideOnSmall: true
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      render: (value, row) => (
        <span className={`px-2 py-1 rounded text-sm ${row.statusClass}`}>
          {value}
        </span>
      )
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      sortable: true,
      width: '100px',
      sortType: 'date',
      render: (value) => (
        <span className={`text-sm`}>
          {new Date(value).toLocaleDateString()}
        </span>
      )
    },
  ]

  return (
    <div>
      <Row fullWidth justify="center">
        <h1 className="text-2xl font-bold mb-4">Our Races</h1>
      </Row>
      <Row fullWidth>
        <Table
          data={events}
          columns={columns}
          pageSize={5}
          showPagination={true}
          striped={true}
          hover={true}
          borderColor="#ff0000"
        />
      </Row>
    </div>
  )
}