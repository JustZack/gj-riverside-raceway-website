'use client'
import Table from '@/components/ui/table/table'
import { ColumnDef } from '@/components/ui/table/types'
import Row from '@/components/ui/row'
import Card from '@/components//ui/card'
import { useState, useEffect } from 'react'
import TrackScheduleUtils, { ScheduleEvent } from '@/lib/utils/track.schedule.utils'

export default function TrackScheduleTable() {

  const [events, setEvents] = useState<ScheduleEvent[]>([])

  useEffect(TrackScheduleUtils.fetchAndFormatEvents.bind(null, setEvents), [])

  const columns: ColumnDef<ScheduleEvent>[] = [
    {
      key: 'title',
      header: 'Name',
      sortable: true,
      align: 'left',
      render: (value, row) => (
        <>
          {row.link ? (
            <a className="text-blue-600 hover:underline" href={row.link} 
              target='_blank' style={{ cursor: 'pointer' }} rel="noreferrer">
              <i className="fa-solid fa-arrow-up-right-from-square mr-1 fa-xs"></i>
              {value}
            </a>
          ) : (<>{value}</>)}
        </>
    )
    }, {
      key: 'entries',
      header: 'Entries',
      sortable: true,
      sortType: 'numeric',
      width: '75px',
      align: 'center',
      hideOnSmall: true
    }, {
      key: 'drivers',
      header: 'Drivers',
      sortable: true,
      sortType: 'numeric',
      align: 'center',
      hideOnSmall: true
    }, {
      key: 'status',
      header: 'Status',
      sortable: true,
      align: 'center',
      render: (value, row) => (
        <span className={`px-2 py-1 rounded text-sm ${row.statusClass}`}>
          {value}
        </span>
      )
    }, {
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
    }
  ]

  return (
    <Card>
      <Row fullWidth justify="center">
        <h1 className="text-2xl font-bold mb-4">Race History</h1>
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
    </Card>
  )
}