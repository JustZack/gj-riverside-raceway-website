'use client'
import Table, { ColumnDef } from '@/components/ui/table/table'
import Button from '@/components/ui/button'

type User = {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  createdAt: string
}

export default function ExampleTablePage() {
  const users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'active', createdAt: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'User', status: 'active', createdAt: '2024-02-20' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 4, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 5, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 6, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 7, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 8, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 9, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 10, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    { id: 11, name: 'Bob Johnson', email: 'bob@example.com', role: 'User', status: 'inactive', createdAt: '2024-03-10' },
    // ... more data
  ]

  const columns: ColumnDef<User>[] = [
    {
      key: 'id',
      header: 'ID',
      sortable: true,
      width: '80px'
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      width: '120px'
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      width: '120px',
      render: (value) => (
        <span className={`px-2 py-1 rounded text-sm ${
          value === 'active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'createdAt',
      header: 'Created',
      sortable: true,
      width: '120px'
    },
    {
      key: 'actions',
      header: 'Actions',
      width: '150px',
      render: (_, row) => (
        <div className="flex gap-2">
          <Button icon="fa-solid fa-edit" 
            onClick={() => console.log('Edit', row)} className="text-xs">
                Edit
            </Button>
          <Button icon="fa-solid fa-trash" backgroundColor="#ef4444"
            onClick={() => console.log('Delete', row)} className="text-xs">
                Delete
            </Button>
        </div>
      )
    }
  ]

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">Users Table</h1>
      
      <Table
        data={users}
        columns={columns}
        pageSize={10}
        showPagination={true}
        striped={true}
        hover={true}
        borderColor="#3b82f6"
      />
    </main>
  )
}