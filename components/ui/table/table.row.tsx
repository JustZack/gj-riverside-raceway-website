import React, { useState } from 'react'
import { ColumnDef } from './types'

type TableRowProps<T> = {
  row: T
  columns: ColumnDef<T>[]
  index: number
  striped: boolean
  hover: boolean
  borderColor: string
}

export default function TableRow<T extends Record<string, any>>({ 
  row, 
  columns, 
  index,
  striped,
  hover,
  borderColor
}: TableRowProps<T>) {
  const backgroundColor = striped && index % 2 === 1 ? '#f9fafb' : 'transparent'

  return (
    <tr
      className={hover ? 'hover:bg-gray-100 transition-colors' : ''}
      style={{ 
        backgroundColor,
        borderBottom: `1px solid ${borderColor}`
      }}
    >
      {columns.map((column, colIndex) => {
        const value = row[column.key]
        const content = column.render ? column.render(value, row) : value

        return (
          <td key={colIndex} className="px-4 py-3" style={{ width: column.width }}>
            {content}
          </td>
        )
      })}
    </tr>
  )
}