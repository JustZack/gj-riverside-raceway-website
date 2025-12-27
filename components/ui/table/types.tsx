export type ColumnDef<T> = {
  key: keyof T | string
  header: string
  sortable?: boolean
  render?: (value: any, row: T) => React.ReactNode
  width?: string,
}

export type SortConfig<T> = {
  key: keyof T | string
  direction: 'asc' | 'desc'
} | null