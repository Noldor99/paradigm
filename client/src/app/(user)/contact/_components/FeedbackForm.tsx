'use client'

import { useCreateFeedback } from '@/ahooks/useFeedback'

import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormInput from '@/components/form/FormInput'
import { FormTextarea } from '@/components/form/FormTextarea'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { FeedbackSchema, IFeedbackSchema } from '@/actions/client/feedbackAction'

import { zodResolver } from '@hookform/resolvers/zod'

export function FeedbackForm() {
  const { mutateAsync: createFeedback, isPending, isError, error } = useCreateFeedback()

  const form = useForm<IFeedbackSchema>({
    mode: 'onChange',
    resolver: zodResolver(FeedbackSchema),
  })

  const { formState } = form

  function onSubmit(data: IFeedbackSchema) {
    createFeedback(data, {
      onSuccess: () => {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex flex-col gap-[16px]">
          <FormInput name="title" placeholder="Title" />
          <FormInput name="email" placeholder="Email" />
          <FormTextarea name="description" placeholder="Page description" />

          <Button
            disabled={isPending || !formState.isValid ? true : false}
            type="submit"
            className="full-w"
          >
            Save
          </Button>
        </div>
      </form>
    </Form>
  )
}
