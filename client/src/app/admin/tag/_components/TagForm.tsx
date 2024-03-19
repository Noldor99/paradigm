'use client'

import { useCreateTag, useUpdateTag } from '@/ahooks/useTag'
import { DialogClose } from '@radix-ui/react-dialog'

import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormInput from '@/components/form/FormInput'
import { FormRadioGroup, TRadioItem } from '@/components/form/FormRadioGroup'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { ITagSchema, TagSchema } from '@/actions/client/tagAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { ITag, TagVariant } from '@/types/tag'

type TagFormPropsType = {
  tag?: ITag
  handleClose: () => void
}

const radioItems: TRadioItem[] = [
  { value: TagVariant.Company, label: 'Company' },
  { value: TagVariant.Location, label: 'Location' },
  { value: TagVariant.Role, label: 'Role' },
]

export const TagForm: FC<TagFormPropsType> = (props: TagFormPropsType) => {
  const { tag, handleClose } = props

  const form = useForm<ITagSchema>({
    mode: 'onChange',
    resolver: zodResolver(TagSchema),
    defaultValues: {
      name: tag?.name || '',
      variant: tag?.variant || '',
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createTag, isPending: pendingTag } = useCreateTag()
  const { mutateAsync: updateTag, isPending: pendingUpdate } = useUpdateTag(tag?.id || '')
  const isPending = pendingTag || pendingUpdate

  function onSubmit(data: ITagSchema) {
    const dirtyFields = formState.dirtyFields

    const changedFields: ITagSchema = Object.keys(dirtyFields).reduce((result, key) => {
      result[key as keyof ITagSchema] = data[key as keyof ITagSchema]

      return result
    }, {} as ITagSchema)

    const mutation = tag ? updateTag : createTag

    mutation(changedFields, {
      onSuccess: () => {
        handleClose()
        toast({ title: 'Success', description: 'Create success' })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({
          title: 'Error',
          description: errorMessage,
          variant: 'destructive',
        })
      },
    })
  }

  return (
    <div className="my-2  flex items-center justify-center gap-2">
      <Form {...form}>
        <form className="w-full " onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-start justify-between gap-4">
            <FormInput name="name" placeholder="Name" />
            <FormRadioGroup name="variant" radioItems={radioItems} />
          </div>

          <div className="mt-[20px] flex max-w-[800px] justify-between">
            <DialogClose>
              <Button variant="default_out">Cansel</Button>
            </DialogClose>
            <Button
              type="submit"
              className=""
              disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
            >
              Save tag
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
