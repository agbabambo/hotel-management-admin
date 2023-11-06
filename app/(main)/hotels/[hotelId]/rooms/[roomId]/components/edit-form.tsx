'use client'

import { FC, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { z } from 'zod'
import axios from 'axios'
import { ChevronLeftIcon, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Room, RoomType } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { infoData, roomStatus } from '../../data'

const formSchema = z.object({
  name: z
    .string()
    .length(4, 'Name contains 4 characters only')
    .startsWith('P', 'Name must start with P character')
    .regex(new RegExp(/^P/), 'Name must start with P character')
    .regex(new RegExp(/\d{3}$/), 'Not a valid number'),
  status: z.string().min(1),
  roomTypeId: z.string().min(1),
})

type FormValues = z.infer<typeof formSchema>

interface FormProps {
  initialData: Room | null
  roomTypes: RoomType[]
}

const FormComponent: FC<FormProps> = ({ initialData, roomTypes }) => {
  const params = useParams()
  const pathname = usePathname()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // this is stupid
  const title = initialData
    ? `Edit ${infoData.label}`
    : `Create ${infoData.label}`
  const description = initialData
    ? `Edit a ${infoData.label}`
    : `Add a new ${infoData.label}`
  const toastMessage = initialData
    ? `${infoData.label} updated`
    : `${infoData.label} created`
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        status: 'empty',
        numberRooms: 1,
        roomTypeId: roomTypes[0].id || '',
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)

      const finalData = {
        ...data,
        hotelId: params.hotelId,
      }

      if (initialData) {
        await axios.patch(
          `/api/${infoData.pluralLink}/${params.roomId}`,
          finalData
        )
      } else {
        await axios.post(`/api/${infoData.pluralLink}`, finalData)
      }
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf('/')))
      toast({ description: toastMessage })
    } catch (error: any) {
      console.log(error)
      toast({ variant: 'destructive', title: error.response.data })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${infoData.pluralLink}/${params.roomId}`)
      router.refresh()
      router.push(pathname.slice(0, pathname.lastIndexOf('/')))
      toast({ description: `${infoData.label} deleted` })
    } catch (error: any) {
      console.log(error)
      toast({ variant: 'destructive', description: error.response.data })
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <div className='flex items-center justify-between'>
        <div>
          <Button
            variant='link'
            className='mb-10 px-0'
            size='sm'
            onClick={() => router.back()}
          >
            <ChevronLeftIcon className='w-6 h-6' /> Back
          </Button>
          <h1 className='tracking-tight text-3xl font-semibold'>{title}</h1>
          <p>{description}</p>
        </div>
        {initialData && (
          <AlertDialog open={open} onOpenChange={() => setOpen((o) => !o)}>
            <AlertDialogTrigger asChild>
              <Button disabled={loading} variant='destructive' size='sm'>
                <Trash className='w-4 h-4' />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={onDelete}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <Separator className='mt-2' />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='mt-10 space-y-3'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Room name'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='status'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Room Status</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select a status'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomStatus.map((rs) => (
                        <SelectItem key={rs.status} value={rs.status}>
                          {rs.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='roomTypeId'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Room Type</FormLabel>
                  <Select
                    disabled={loading}
                    onValueChange={field.onChange}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue
                          defaultValue={field.value}
                          placeholder='Select room type'
                        />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {roomTypes.map((rt) => (
                        <SelectItem key={rt.id} value={rt.id}>
                          {rt.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
          <Button
            className='mt-10'
            disabled={loading}
            type='submit'
            variant='blue'
          >
            {action}
          </Button>
        </form>
      </Form>
    </>
  )
}

export default FormComponent
