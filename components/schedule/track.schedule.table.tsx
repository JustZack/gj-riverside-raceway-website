'use client'
import API from '@/lib/api/api'
import Table from '@/components/ui/table/table'
import { ColumnDef } from '@/components/ui/table/types'
import Row from '../ui/row'
import { useState, useEffect } from 'react'

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
        liveTimeLink: event.liveTimeEvent ? `https://jjsraceway.liverc.com/results/?p=view_event&id=${event.liveTimeEvent.id}` : null,
        entries: event.liveTimeEvent ? event.liveTimeEvent.entries : null,
        drivers: event.liveTimeEvent ? event.liveTimeEvent.drivers : null,
        status: event.cancelled ? 'cancelled' : (new Date(event.end) < new Date() ? 'finished' : (new Date(event.start) <= new Date() ? 'running' : 'upcoming')),
        statusClass: event.cancelled ? 'bg-red-100 text-red-800' : (new Date(event.end) < new Date() ? 'bg-gray-100 text-gray-800' : (new Date(event.start) <= new Date() ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800')),
        updatedAt: new Date(event.updatedAt).toLocaleDateString(),
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
      render: (value, row) => (<a href={row.liveTimeLink}>{value}</a>)
    },
    {
      key: 'entries',
      header: 'Entries',
      sortable: true,
      width: '120px'
    },
    {
      key: 'drivers',
      header: 'Drivers',
      sortable: true,
      width: '120px'
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
      render: (value, row) => (
        <span className={`px-2 py-1 rounded text-sm ${row.statusClass}`}>{value}
        </span>
      )
    },
    {
      key: 'updatedAt',
      header: 'Updated',
      sortable: true,
      width: '120px'
    },
  ]

  return (
    <div>
      <Row fullWidth justify="center">
        <h1 className="text-2xl font-bold mb-4">Schedule Table</h1>
      </Row>
      <Row fullWidth>
        <Table
          data={events}
          columns={columns}
          pageSize={10}
          showPagination={true}
          striped={true}
          hover={true}
          borderColor="#3b82f6"
        />
      </Row>
    </div>
  )
}