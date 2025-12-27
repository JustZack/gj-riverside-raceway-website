import React, { useState } from 'react'
import { ColumnDef, SortConfig } from './types'

type TableHeaderProps<T> = {
  columns: ColumnDef<T>[]
  sortConfig: SortConfig<T>
  onSort: (key: keyof T | string) => void
  borderColor: string
}

export default function TableHeader<T>({ 
  columns, 
  sortConfig, 
  onSort,
  borderColor 
}: TableHeaderProps<T>) {
  return (
    <thead>
      <tr style={{ borderBottom: `2px solid ${borderColor}` }}>
        {columns.map((column, index) => {
          const textAlign = column.align || 'left'
          const style: React.CSSProperties = { textAlign }
          if (column.width) {
            style.width = column.width
          }
          return (
          <th
            key={index}
            className={`px-4 py-3 font-semibold ${
              column.sortable ? 'cursor-pointer select-none hover:bg-gray-50' : ''
            }`}
            style={style}
            onClick={() => column.sortable && onSort(column.key)}
          >
            <div className="flex items-center gap-2">
              <span>{column.header}</span>
              {column.sortable && (
                <SortIcon
                  active={sortConfig?.key === column.key}
                  direction={sortConfig?.key === column.key ? sortConfig.direction : null}
                />
              )}
            </div>
          </th>
        )})}
      </tr>
    </thead>
  )
}

type SortIconProps = {
  active: boolean
  direction: 'asc' | 'desc' | null
}

export function SortIcon({ active, direction }: SortIconProps) {
  return (
    <span className="flex flex-col text-xs">
      <i 
        className={`fa-solid fa-caret-up -mb-1 ${
          active && direction === 'asc' ? 'text-blue-500' : 'text-gray-400'
        }`}
      />
      <i 
        className={`fa-solid fa-caret-down ${
          active && direction === 'desc' ? 'text-blue-500' : 'text-gray-400'
        }`}
      />
    </span>
  )
}