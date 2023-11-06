'use client'

import axios from 'axios'
import { useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { toast } from '@/components/ui/use-toast'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Column } from './columns'

interface CellActionProps {
  data: Column
  label: string
  link: string
  pluralLink: string
  message: string
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
  label,
  link,
  message,
  pluralLink,
}) => {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/${pluralLink}/${data.id}`)
      toast({ description: `${label} deleted` })
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        description: message,
      })
    } finally {
      setOpen(false)
    }
  }

  return (
    <>
      <AlertDialog open={open} onOpenChange={() => setOpen((o) => !o)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='ghost' className='h-8 w-8 p-0'>
            <span className='sr-only'>Open menu</span>
            <MoreHorizontal className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => router.push(`/${pluralLink}/${data.id}`)}
          >
            <Edit className='mr-2 h-4 w-4' /> Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className='mr-2 h-4 w-4' /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}
