'use client'

import { useUpdateGeneral } from '@/ahooks/useGeneral'

import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { GeneralSchema, IGeneralSchema } from '@/actions/client/generalAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { urlRevalidate } from '@/lib/urlRevalidate'

import { IGeneral } from '@/types/general'

interface HigherFormProps {
  general?: IGeneral
  formSection: ReactElement
  routRevalidate: string
}

export function HigherFormGeneral({ general, formSection, routRevalidate }: HigherFormProps) {
  const { mutateAsync: updateContact, isPending, isError, error } = useUpdateGeneral()

  const form = useForm<IGeneralSchema>({
    mode: 'onChange',
    resolver: zodResolver(GeneralSchema),
    defaultValues: {
      aboutLexical: general?.aboutLexical || '',
      websiteTerms: general?.websiteTerms || '',
      importantDisclosures: general?.importantDisclosures || '',
      privacyPolicy: general?.privacyPolicy || '',
      generalImg: general?.generalImg || '',
      contact: general?.contact || {
        information: '',
        pressInquiries: '',
        investorInquiries: '',
        linkedin: '',
        twitter: '',
      },
    },
  })

  const { formState } = form

  function onSubmit(data: IGeneralSchema) {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof IGeneralSchema]

      if (formState.dirtyFields[key as keyof IGeneralSchema]) {
        if (key === 'contact') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value as string | Blob)
        }
      }
    }
    updateContact(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Update success' })
        urlRevalidate(routRevalidate)
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({ title: 'Error', description: errorMessage })
      },
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-[16px]">
          {React.cloneElement(formSection, { onSubmit, isPending, formState })}
        </div>
      </form>
    </Form>
  )
}
