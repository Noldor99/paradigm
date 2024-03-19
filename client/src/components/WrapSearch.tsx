'use client'

import * as z from 'zod'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { IconSearch } from '@tabler/icons-react'

import { useDebounce } from '@/hooks/useDebounce'

import { cn } from '@/lib/utils'

const searchSchema = z.object({
  search: z.string().optional().nullable().default(''),
})

const WrapSearch = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const { register, watch, reset } = useForm<z.infer<typeof searchSchema>>({
    mode: 'onChange',
    defaultValues: searchSchema.parse({}),
  })

  const debouncedValue = useDebounce<string>(watch('search') ?? '', 300)

  useEffect(() => {
    const params = new URLSearchParams(searchParams)

    if (debouncedValue) {
      params.set('search', debouncedValue)
      params.set('page', '1')
    } else {
      params.delete('search')
      params.set('page', '1')
    }

    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedValue])

  return (
    <div className={cn('flex flex-1 items-center justify-start', 'border border-black')}>
      <IconSearch className="mx-2" />
      <input
        type="text"
        className={cn('mt-0 w-full px-3 py-1', 'border-none bg-transparent outline-none')}
        placeholder="Find"
        {...register('search')}
        autoComplete="new-password"
      />
    </div>
  )
}

export default WrapSearch
