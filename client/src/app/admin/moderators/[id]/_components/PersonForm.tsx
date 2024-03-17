'use client'

import { useCreatePerson, useUpdatePerson } from '@/ahooks/usePerson'

import { FC, useId } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormDropImg from '@/components/form/FormDropImg'
import FormInput from '@/components/form/FormInput'
import FormInputImg from '@/components/form/FormInputImg'
import { FormTextarea } from '@/components/form/FormTextarea'
import ImgPerson from '@/components/imgWrap/ImgPerson'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { IPersonSchema, PersonSchema } from '@/actions/client/personAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { cn } from '@/lib/utils'

import { IPerson } from '@/types/person'

import FormLinks from './FormLinks'

interface IPersonFormProps {
  person?: IPerson
  userId?: string
}

export const PersonForm: FC<IPersonFormProps> = ({ person, userId }: IPersonFormProps) => {
  const form = useForm<IPersonSchema>({
    mode: 'onChange',
    resolver: zodResolver(PersonSchema),
    defaultValues: {
      router: person?.router || '',
      fullName: person?.fullName || '',
      position: person?.position || '',
      description: person?.description || '',
      personImg: person?.personImg || '',
      links: person?.links || [],
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createPerson, isPending: pendingPerson } = useCreatePerson()
  const { mutateAsync: updatePersons, isPending: pendingUpdate } = useUpdatePerson(person?.id || '')
  const isPending = pendingPerson || pendingUpdate

  const onSubmit = (data: IPersonSchema) => {
    const formData = new FormData()
    formData.append('userId', userId || '')

    for (const key in data) {
      const value = data[key as keyof IPersonSchema]

      if (formState.dirtyFields[key as keyof IPersonSchema]) {
        if (key === 'links') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value as string | Blob)
        }
      }
    }

    const mutation = person ? updatePersons : createPerson

    mutation(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Update success' })
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({ title: 'Error', description: errorMessage, variant: 'destructive' })
      },
    })
  }

  const formId = useId()

  return (
    <div>
      <div className="my-2 mb-[40px] flex items-center justify-center gap-2">
        <Form {...form}>
          <form className="w-full space-y-2" onSubmit={handleSubmit(onSubmit)} id={formId}>
            <div className="flex items-start justify-between gap-4">
              <FormInput name="router" placeholder="Router" />
              <FormInput name="fullName" placeholder="Full Name" />
            </div>
            <FormTextarea name="position" placeholder="Position" />
            <FormTextarea name="description" placeholder="Person description" />
            <div>
              <div className="mb-4">
                <FormInputImg name="personImg" imgPreview={person?.personImg} />
              </div>
              <FormLinks />
            </div>

            <div>
              <Button
                type="submit"
                className="mt-6"
                form={formId}
                disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
              >
                Save person
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
