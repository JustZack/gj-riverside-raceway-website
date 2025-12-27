'use client'
import React, { useState } from 'react'
import { ColumnDef, SortConfig } from './types'
import TableHeader from './table.header'
import TableRow from './table.row'
import TablePagination from './table.pagination'

type TableProps<T> = {
  data: T[]
  columns: ColumnDef<T>[]
  textColor?: string
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  borderRadius?: number
  className?: string
  pageSize?: number
  showPagination?: boolean
  striped?: boolean
  hover?: boolean
  maintainHeight?: boolean
}


export default function Table<T extends Record<string, any>>({ 
  data,
  columns,
  textColor = '#1f1e1eff',
  backgroundColor = '#ffffff', 
  borderColor = '#e5e7eb',
  borderWidth = 1,
  className = '',
  borderRadius = 5,
  pageSize = 10,
  showPagination = true,
  striped = true,
  hover = true,
  maintainHeight = true
}: TableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)
  const [sortConfig, setSortConfig] = useState<SortConfig<T>>(null)

  // Sorting logic
  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data

    const column = columns.find(col => col.key === sortConfig.key)
    if (!column) return data

    return [...data].sort((a, b) => {
      // Use custom sort function if provided
      if (column.sortFn) {
        const comparison = column.sortFn(a, b)
        return sortConfig.direction === 'asc' ? comparison : -comparison
      }

      const aValue = a[sortConfig.key]
      const bValue = b[sortConfig.key]

      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0
      if (aValue == null) return 1
      if (bValue == null) return -1

      let comparison = 0
      const sortType = column.sortType || 'lexicographic'

      switch (sortType) {
        case 'numeric':
          comparison = Number(aValue) - Number(bValue)
          break
        case 'date':
          comparison = new Date(aValue).getTime() - new Date(bValue).getTime()
          break
        case 'lexicographic':
        default:
          comparison = String(aValue).localeCompare(String(bValue))
          break
      }

      return sortConfig.direction === 'asc' ? comparison : -comparison
    })
  }, [data, sortConfig, columns])

  // Pagination logic
  const totalPages = Math.ceil(sortedData.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const paginatedData = showPagination 
    ? sortedData.slice(startIndex, endIndex)
    : sortedData

  // Fill empty rows to maintain consistent table height
  const emptyRowsCount = (maintainHeight && showPagination) ? Math.max(0, pageSize - paginatedData.length) : 0

  // Handle sorting
  const handleSort = (key: keyof T | string) => {
    const column = columns.find(col => col.key === key)
    if (!column?.sortable) return

    setSortConfig(current => {
      if (!current || current.key !== key) {
        return { key, direction: 'asc' }
      }
      if (current.direction === 'asc') {
        return { key, direction: 'desc' }
      }
      return null
    })
  }

  // Handle pagination
  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  return (
    <div 
      className={`w-full rounded overflow-hidden ${className}`}
      style={{ 
        backgroundColor,
        border: `${borderWidth}px solid ${borderColor}`,
        borderRadius: `${borderRadius}px`,
        color: textColor
      }}
    >
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader 
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            borderColor={borderColor}
          />
          <tbody>
            {paginatedData.map((row, index) => (
              <TableRow
                key={index}
                row={row}
                columns={columns}
                index={index}
                striped={striped}
                hover={hover}
                borderColor={borderColor}
              />
            ))}
            {/* Empty rows to maintain consistent height */}
            {Array.from({ length: emptyRowsCount }).map((_, index) => (
              <tr
                key={`empty-${index}`}
                className={striped && (paginatedData.length + index) % 2 === 1 ? 'bg-gray-50' : ''}
                style={{ borderBottom: `1px solid ${borderColor}` }}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={`px-4 py-3 ${column.hideOnSmall ? 'hidden md:table-cell' : ''}`}
                    style={{ height: '53px' }}
                  >
                    &nbsp;
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPagination && totalPages > 1 && (
        <TablePagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          borderColor={borderColor}
          totalItems={sortedData.length}
          pageSize={pageSize}
        />
      )}
    </div>
  )
}