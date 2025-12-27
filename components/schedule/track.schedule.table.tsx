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

  function determineStatus(event: any): 'cancelled' | 'finished' | 'upcoming' | 'running' {
    if (event.cancelled) return 'cancelled'
    else if (new Date(event.end) < new Date()) return 'finished'
    else if (new Date(event.start) <= new Date()) return 'running'
    else return 'upcoming'
  }

  function determineStatusClass(event: any): string {
    if (event.cancelled) return 'bg-red-100 text-red-800'
    else if (new Date(event.end) < new Date()) return 'bg-green-100 text-green-800'
    else if (new Date(event.start) <= new Date()) return 'bg-gray-300 text-gray-900'
    else return 'bg-blue-100 text-blue-800'
  }

  function getLiveTimeLink(event: any): string | undefined {
    if (event.liveTimeEvent) {
      return `https://jjsraceway.liverc.com/results/?p=view_event&id=${event.liveTimeEvent.id}`
    }
  }

  useEffect(() => {
    API.getSchedule().then((data) => {
      const formattedData = data.map((event: any) => ({
        name: event.name,
        liveTimeLink: getLiveTimeLink(event),
        entries: event.liveTimeEvent ? event.liveTimeEvent.entries : undefined,
        drivers: event.liveTimeEvent ? event.liveTimeEvent.drivers : undefined,
        status: determineStatus(event),
        statusClass: determineStatusClass(event),
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
      <a className="text-blue-600 hover:underline" href={row.liveTimeLink} target='_blank'>
        <i className="fa-solid fa-arrow-up-right-from-square mr-2"></i>
        {value}
      </a>
    )
    },
    {
      key: 'entries',
      header: 'Entries',
      sortable: true,
      sortType: 'numeric',
      width: '75px',
      align: 'center'
    },
    {
      key: 'drivers',
      header: 'Drivers',
      sortable: true,
      sortType: 'numeric',
      width: '75px',
      align: 'center'
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
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
      width: '225px',
      sortType: 'date',
      render: (value) => (
        <span>{new Date(value).toLocaleString() }</span>
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