'use server'

import React from 'react'

import SearchComponent from '@/components/SearchComponent'
import { SPagination } from '@/components/_onlyServer/SPagination'
import ImgPerspective from '@/components/imgWrap/ImgPerspective'
import { Badge } from '@/components/ui/badge'

import { perspectivePrefetch } from '@/actions/server/perspectivePrefetch'
import { tagPrefetch } from '@/actions/server/tagPrefetch'

import { cn } from '@/lib/utils'

import { PageProps } from '../page'
import TagSearch from './TagSearch'

export type FetchFeedType = typeof fetchFeed

const PAGE_LIMIT = 8

const fetchFeed = async ({ limit = PAGE_LIMIT, page = 1, search = '', tagsParam = '' }) => {
  const results = await perspectivePrefetch({
    limit,
    page,
    search,
    tags: tagsParam,
  })

  const { totalCount } = results

  return {
    data: results,
    paginationData: {
      hasNextPage: 1 + page < totalCount,
      totalPages: Math.ceil(totalCount / limit),
      limit,
      page,
      saveParam: [{ search: search, tags: tagsParam }],
    },
  }
}

export const PerspectiveList = async ({ searchParams }: PageProps) => {
  const pageNumber = Number(searchParams?.page || 1)
  const limit = PAGE_LIMIT
  const search = searchParams?.search
  const tagsParam = searchParams?.tags
  const page = pageNumber
  const { data, paginationData } = await fetchFeed({
    limit,
    page,
    search,
    tagsParam,
  })
  const tagsData = await tagPrefetch({})

  return (
    <div className="space-y-6">
      <p className="text-h2">Opportunities in the Paradigm perspective</p>
      <TagSearch tagData={tagsData.tags.filter((tag) => tag.countUse > 0)} link="perspective" />
      <div className="paper-rounded flex flex-col gap-6 sm:flex-row ">
        <SearchComponent link="perspective" />
      </div>
      <div className={cn('grid grid-cols-1 gap-3')}>
        {data.perspectives.map((perspective, i) => (
          <div key={i} className={cn('paper-blue flex flex-row  ')}>
            <div className={cn('hidden w-[200px] sm:block')}>
              <ImgPerspective imgData={perspective} />
            </div>
            <div className="flex flex-col px-6 pb-0">
              <div className="text-h3 mb-1 line-clamp-6">{perspective.title}</div>
              <div className="text-s mb-1 line-clamp-6">{perspective.description}</div>
              <div className="my-1 flex flex-wrap gap-4">
                {perspective?.tags.map((tag) => (
                  <Badge variant="muted" key={tag.id} className="flex gap-4">
                    <div>{tag.name}</div>
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {data?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {paginationData.totalPages !== 1 && <SPagination {...paginationData} />}
    </div>
  )
}
