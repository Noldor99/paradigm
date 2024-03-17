'use client'

import { useCreatePortfolio, useUpdatePortfolio } from '@/ahooks/usePortfolio'

import { FC, useId } from 'react'
import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormDropImg from '@/components/form/FormDropImg'
import FormInput from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import ImgPortfolio from '@/components/imgWrap/ImgPortfolio'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { IPortfolioSchema, PortfolioSchema } from '@/actions/client/portfolioAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { urlRevalidate } from '@/lib/urlRevalidate'
import { cn } from '@/lib/utils'

import { IPortfolio } from '@/types/portfolio'

import FormLinks from './FormLinks'

type PortfolioFormPropsType = {
  portfolio?: IPortfolio
}

export const PortfolioForm: FC<PortfolioFormPropsType> = ({
  portfolio,
}: PortfolioFormPropsType) => {
  const form = useForm<IPortfolioSchema>({
    mode: 'onChange',
    resolver: zodResolver(PortfolioSchema),
    defaultValues: {
      title: portfolio?.title || '',
      description: portfolio?.description || '',
      subDescription: portfolio?.subDescription || '',
      portfolioImg: portfolio?.portfolioImg || '',
      links: portfolio?.links || [],
    },
  })

  const { formState, handleSubmit } = form
  const { mutateAsync: createPortfolio, isPending: pendingPortfolio } = useCreatePortfolio()
  const { mutateAsync: updatePortfolios, isPending: pendingUpdate } = useUpdatePortfolio(
    portfolio?.id || ''
  )
  const isPending = pendingPortfolio || pendingUpdate

  const onSubmit = (data: IPortfolioSchema) => {
    const formData = new FormData()

    for (const key in data) {
      const value = data[key as keyof IPortfolioSchema]

      if (formState.dirtyFields[key as keyof IPortfolioSchema]) {
        if (key === 'links') {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value as string | Blob)
        }
      }
    }

    const mutation = portfolio ? updatePortfolios : createPortfolio

    mutation(formData, {
      onSuccess: () => {
        toast({ title: 'Success', description: 'Update success' })
        urlRevalidate('/portfolio')
        if (portfolio) {
          urlRevalidate(`/portfolio/${portfolio?.id}`)
        }
      },
      onError: (error) => {
        const errorMessage =
          ((error as AxiosError)?.response?.data as { message: string })?.message || 'Unknown error'

        toast({ title: 'Error', description: errorMessage })
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
              <FormInput name="title" placeholder="Portfolio title" />
            </div>
            <FormTextarea name="description" placeholder="Portfolio description" />
            <FormTextarea name="subDescription" placeholder="Portfolio subDescription" />
            <div>
              <FormDropImg textButton="Add" name="portfolioImg" imgRender={<ImgPortfolio />} />

              <FormLinks />
            </div>

            <div>
              <Button
                type="submit"
                className="mt-6"
                form={formId}
                disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
              >
                Save portfolio
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  )
}
