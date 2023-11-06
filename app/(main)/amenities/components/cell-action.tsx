'use client'

import axios from 'axios'
import { useState } from 'react'
import { Edit, MoreHorizontal, Trash } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'

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
import { infoData } from '../data'

interface CellActionProps {
  id: string
}

export const CellAction: React.FC<CellActionProps> = ({ id }) => {
  const router = useRouter()
  const pathname = usePathname()

  const [open, setOpen] = useState(false)

  const onConfirm = async () => {
    try {
      await axios.delete(`/api/${infoData.pluralLink}/${id}`)
      toast({ description: `${infoData.label} deleted` })
      router.refresh()
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
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
          <DropdownMenuItem onClick={() => router.push(`/${pathname}/${id}`)}>
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
