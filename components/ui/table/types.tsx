export type ColumnDef<T> = {
  key: keyof T | string
  header: string
  sortable?: boolean
  width?: string | number
  align?: 'left' | 'center' | 'right'
  render?: (value: any, row: T) => React.ReactNode
}

export type SortConfig<T> = {
  key: keyof T | string
  direction: 'asc' | 'desc'
} | null