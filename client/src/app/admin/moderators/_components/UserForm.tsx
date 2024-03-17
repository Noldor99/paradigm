'use client'

import { useUpdateUser } from '@/ahooks/useUser'

import { useForm } from 'react-hook-form'

import { AxiosError } from 'axios'

import FormInput from '@/components/form/FormInput'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { toast } from '@/components/ui/use-toast'

import { IUserSchema, UserSchema } from '@/actions/client/userAction'

import { zodResolver } from '@hookform/resolvers/zod'

import { IUser } from '@/types/user'

interface UserFormProps {
  user?: IUser
}

export function UserForm({ user }: UserFormProps) {
  const { mutateAsync: updateUser, isPending, isError, error } = useUpdateUser()

  const form = useForm<IUserSchema>({
    mode: 'onChange',
    resolver: zodResolver(UserSchema),
    defaultValues: {
      username: user?.username || '',
      email: user?.email || '',
    },
  })

  const { formState } = form

  function onSubmit(data: IUserSchema) {
    const updatedFields: Partial<IUserSchema> = {}

    for (const key in data) {
      if (formState.dirtyFields[key as keyof IUserSchema]) {
        updatedFields[key as keyof IUserSchema] = data[key as keyof IUserSchema]
      }
    }

    if (Object.keys(updatedFields).length > 0) {
      //@ts-ignore
      updateUser(updatedFields, {
        onSuccess: (data) => {
          toast({ title: 'Success', description: 'Update success' })
        },
        onError: (error) => {
          const errorMessage =
            ((error as AxiosError)?.response?.data as { message: string })?.message ||
            'Unknown error'

          toast({
            title: 'Error',
            description: errorMessage,
            variant: 'destructive',
          })
        },
      })
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="mt-[24px] flex flex-col gap-[16px]">
          <FormInput name="username" placeholder="Username" />
          <FormInput name="email" placeholder="Email" />
          <FormInput name="password" placeholder="Password" type="password" />
          <FormInput name="confirmPassword" placeholder="confirmPassword" type="password" />
          <Button
            disabled={isPending || !formState.isValid ? true : formState.isDirty ? false : true}
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
