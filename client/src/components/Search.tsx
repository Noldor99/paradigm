'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'

import React, { useEffect, useState } from 'react'

import { IconSearch } from '@tabler/icons-react'

import { useDebounce } from '@/hooks/useDebounce'

import { cn } from '@/lib/utils'

interface SearchProps {
  saveParam?: string[]
}

const Search = ({ saveParam }: SearchProps) => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const [text, setText] = useState<string | undefined>(undefined)
  const debouncedValue = useDebounce(text, 300)

  useEffect(() => {
    if (debouncedValue === undefined) return

    const params = new URLSearchParams()
    const currentParams = new URLSearchParams(searchParams)

    if (saveParam) {
      saveParam.forEach((param) => {
        if (currentParams.has(param)) {
          const paramValue = currentParams.get(param)
          if (paramValue !== null) {
            params.set(param, paramValue)
          }
        }
      })
    }
    if (debouncedValue) {
      params.set('search', debouncedValue)
    } else params.delete('search')

    router.push(`${pathname}?${params.toString()}`)
  }, [debouncedValue])

  return (
    <div className={cn('flex flex-1 items-center justify-start', 'border border-black')}>
      <IconSearch className="mx-2" />
      <input
        type="text"
        className={cn('mt-0 w-full px-3 py-1', 'border-none bg-transparent outline-none')}
        placeholder="Search ..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    </div>
  )
}

export default Search
