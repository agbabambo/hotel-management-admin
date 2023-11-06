'use client'

import { FC, useState } from 'react'
import { useParams, usePathname, useRouter } from 'next/navigation'
import { z } from 'zod'
import axios from 'axios'
import { ChevronLeftIcon, Trash } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Amenity } from '@prisma/client'

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
import { Textarea } from '@/components/ui/textarea'
import { infoData } from '../data'
import ImageUpload from '@/components/ui/image-upload'

const formSchema = z.object({
  name: z.string().min(1, 'Name length must be atleast 4 characters only'),
  description: z.string().min(1),
  image: z.string(),
})

type FormValues = z.infer<typeof formSchema>

interface FormProps {
  initialData: Amenity | null
}

const EditForm: FC<FormProps> = ({ initialData }) => {
  const params = useParams()
  const router = useRouter()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  // This looks so stupid
  const title = initialData
    ? `Edit ${infoData.link}`
    : `Create ${infoData.link}`
  const description = initialData
    ? `Edit a ${infoData.link}`
    : `Add a new ${infoData.link}`
  const toastMessage = initialData
    ? `${infoData.label} updated`
    : `${infoData.label} created`
  const action = initialData ? 'Save changes' : 'Create'

  const defaultValues = initialData
    ? initialData
    : {
        name: '',
        description: '',
        image: '',
      }

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  const onSubmit = async (data: FormValues) => {
    try {
      setLoading(true)
      if (initialData) {
        await axios.patch(
          `/api/${infoData.pluralLink}/${params.amenityId}`,
          data
        )
      } else {
        await axios.post(`/api/${infoData.pluralLink}`, data)
      }
      router.refresh()
      router.push(`/${infoData.pluralLink}`)
      toast({ description: toastMessage })
    } catch (error: any) {
      console.log(error)
      toast({ variant: 'destructive', title: 'Something went wrong' })
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${infoData.pluralLink}/${params.amenityId}`)
      router.refresh()
      router.push(`/${infoData.pluralLink}`)
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
          <div className='mt-10 w-full space-y-10'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder='Name' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={loading}
                      placeholder='Description'
                      rows={10}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='image'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    {/* TODO: add upload one image option, make this less complicated */}
                    <ImageUpload
                      value={field.value ? [field.value] : []}
                      disabled={loading}
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
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

export default EditForm
