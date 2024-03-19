'use client'

import { useCreatePerspective, useUpdatePerspective } from '@/ahooks/usePerspective'

import { FC } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormDropImg from '@/components/form/FormDropImg'
import FormInput from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import ImgPerspective from '@/components/imgWrap/ImgPerspective'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { IPerspectiveSchema, PerspectiveSchema } from '@/actions/client/perspectiveAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { urlRevalidate } from '@/lib/urlRevalidate'
import { cn } from '@/lib/utils'

import { IPerspective } from '@/types/perspective'

import TagsFormList from './TagFormList'

type PerspectiveFormPropsType = {
  perspective?: IPerspective
}

export const PerspectiveForm: FC<PerspectiveFormPropsType> = ({
  perspective,
}: PerspectiveFormPropsType) => {
  const form = useForm<IPerspectiveSchema>({
    mode: 'onChange',
    resolver: zodResolver(PerspectiveSchema),
    defaultValues: {
      title: perspective?.title || '',
      description: perspective?.description || '',
      perspectiveImg: perspective?.perspectiveImg || '',
      tags: perspective?.tags,
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createPerspective, isPending: pendingPerspective } = useCreatePerspective()
  const { mutateAsync: updatePerspectives, isPending: pendingUpdate } = useUpdatePerspective(
    perspective?.id || ''
  )
  const isPending = pendingPerspective || pendingUpdate

  const onSubmit = (data: IPerspectiveSchema) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof IPerspectiveSchema]

      if (formState.dirtyFields[key as keyof IPerspectiveSchema]) {
        if (key === 'tags') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value as string | Blob)
        }
      }
    }

    const mutation = perspective ? updatePerspectives : createPerspective

    mutation(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Update success' })
        urlRevalidate('/perspective')
        if (perspective) {
          urlRevalidate(`/perspective/${perspective?.id}`)
        }
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({ title: 'Error', description: errorMessage })
      },
    })
  }

  return (
    <div>
      <div className="my-2 mb-[40px] flex items-center justify-center gap-2">
        <Form {...form}>
          <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex items-start justify-between gap-4">
              <FormInput name="title" placeholder="Perspective title" />
            </div>
            <FormTextarea name="description" placeholder="Perspective description" />
            <TagsFormList />
            <div>
              <FormDropImg textButton="Add" name="perspectiveImg" imgRender={<ImgPerspective />} />
            </div>
            <div>
              <Button
                type="submit"
                className="mt-6"
                disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
              >
                Save perspective
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
