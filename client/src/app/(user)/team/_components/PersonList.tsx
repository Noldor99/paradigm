'use server'

import Link from 'next/link'

import React from 'react'

import BadgeLink from '@/components/BadgeLink'
import { SPagination } from '@/components/_onlyServer/SPagination'
import ImgPerson from '@/components/imgWrap/ImgPerson'

import { personPrefetch } from '@/actions/server/personPrefetch'

import { cn } from '@/lib/utils'

import { PageProps } from '../page'

export type FetchFeedType = typeof fetchFeed

const PAGE_LIMIT = 8

const fetchFeed = async ({ limit = PAGE_LIMIT, page = 1 }) => {
  const results = await personPrefetch({
    limit,
    page,
  })

  const { totalCount } = results

  return {
    data: results,
    paginationData: {
      hasNextPage: 1 + page < totalCount,
      totalPages: Math.ceil(totalCount / limit),
      limit,
      page,
      saveParam: [],
    },
  }
}

export const PersonList = async ({ searchParams }: PageProps) => {
  const pageNumber = Number(searchParams?.page || 1)
  const limit = PAGE_LIMIT
  const page = pageNumber
  const { data, paginationData } = await fetchFeed({
    limit,
    page,
  })

  return (
    <div className="space-y-6">
      <h1 className="paper-rounded text-h1">Team</h1>
      <div className={cn('grid grid-cols-1 gap-6', 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4')}>
        {data.persons.map((person, i) => (
          <Link href={`/team/${person.router}`} key={i}>
            <div className={cn('paper-blue flex h-full flex-col hover:border-black')}>
              <div className={cn('mb-3 w-full')}>
                <ImgPerson imgData={person} />
              </div>
              <div className="flex flex-1 flex-col gap-3 px-6 pb-6 ">
                <div className="flex flex-1 flex-col">
                  <div className="text-h3 mb-4 line-clamp-6">{person.fullName}</div>
                  <div className="text-s mb-1 line-clamp-6">{person.description}</div>
                </div>
                <BadgeLink person={person} />
              </div>
            </div>
          </Link>
        ))}
      </div>
      {paginationData.totalPages !== 1 && <SPagination {...paginationData} />}
    </div>
  )
}
