'use client'

import { ColumnDef } from '@tanstack/react-table'
import { Role } from '@prisma/client'

import CellAction from './cell-action'

export type Column = {
  id: string
  name: string | null
  email: string
  sex: string
  birthday: string
  address: string
  createdAt: string
  role: Role
}

export const columns: ColumnDef<Column>[] = [
  {
    accessorKey: 'name',
    header: 'Username',
    cell: ({ row }) => <div className='font-bold'>{row.original.name}</div>,
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'sex',
    header: 'Gender',
  },
  {
    accessorKey: 'address',
    header: 'Address',
  },
  {
    accessorKey: 'role',
    header: 'Role',
  },
  {
    accessorKey: 'createdAt',
    header: 'Created At',
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <CellAction id={row.original.id} role={row.original.role} />
    ),
  },
]
