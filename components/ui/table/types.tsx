export type ColumnDef<T> = {
  key: keyof T | string
  header: string
  sortable?: boolean
  sortType?: 'lexicographic' | 'numeric' | 'date'
  sortFn?: (a: T, b: T) => number
  width?: string | number
  align?: 'left' | 'center' | 'right'
  hideOnSmall?: boolean
  render?: (value: any, row: T) => React.ReactNode
}

export type SortConfig<T> = {
  key: keyof T | string
  direction: 'asc' | 'desc'
} | null