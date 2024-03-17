'use client'

import React from 'react'
import { useFieldArray, useFormContext } from 'react-hook-form'

import { IconPlus, IconX } from '@tabler/icons-react'

import FormInput from '@/components/form/FormInput'
import { Badge, badgeVariants } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'

import { cn } from '@/lib/utils'

const FormLinks = () => {
  const form = useFormContext()

  const { fields, append, remove } = useFieldArray({
    name: 'links',
  })

  return (
    <>
      <div className={cn('grid grid-cols-1 gap-6', 'sm:grid-cols-2 md:grid-cols-3 ')}>
        {fields.map((item, index) => (
          <div>
            <div key={item.id}>
              <div className="paper-rounded mb-[10px] flex w-full flex-col items-center gap-[20px] bg-white">
                <div className="flex w-full  gap-5">
                  <FormInput name={`links.${index}.name`} />
                  <div>
                    <IconX
                      className="!h-6 !w-6 cursor-pointer text-inherit"
                      onClick={() => remove(index)}
                    />
                  </div>
                </div>
                <FormInput name={`links.${index}.link`} />
              </div>
            </div>

            {!form.watch(`links.${index}.name`) && (
              <FormMessage className="float">Link name is required.</FormMessage>
            )}
            {/* @ts-ignore */}
            {form.formState.errors.links?.[index]?.text && (
              <FormMessage className="float">
                {/* @ts-ignore */}
                {form.formState.errors.links[index].text.message}
              </FormMessage>
            )}
          </div>
        ))}
      </div>
      <Button
        onClick={() =>
          append({
            name: '',
            link: 'https://www.youtube.com/',
          })
        }
      >
        <IconPlus />
      </Button>
      {form.formState.errors.links && (
        <p className={cn('text-sm font-medium text-destructive')}>
          {form.formState.errors.links.message as keyof typeof form.formState.errors}
        </p>
      )}
    </>
  )
}

export default FormLinks
