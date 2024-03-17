'use server'

import Link from 'next/link'

import React from 'react'

import { IconLayoutGrid, IconLayoutList } from '@tabler/icons-react'

import { SPagination } from '@/components/_onlyServer/SPagination'
import { SToggle } from '@/components/_onlyServer/SToggle'
import ImgPortfolio from '@/components/imgWrap/ImgPortfolio'
import { Button } from '@/components/ui/button'

import { portfolioPrefetch } from '@/actions/server/portfolioPrefetch'

import { cn } from '@/lib/utils'

import { PageProps } from '../page'

export type FetchFeedType = typeof fetchFeed

const PAGE_LIMIT = 8
const PAGE_VIEW = 'grid'

const fetchFeed = async ({ limit = PAGE_LIMIT, page = 1, view = PAGE_VIEW }) => {
  'use server'

  const results = await portfolioPrefetch({
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
      saveParam: [{ view: view }],
    },
    viewData: {
      view,
      saveParam: [{ page: page }],
    },
  }
}

export const PortfolioList = async ({ searchParams }: PageProps) => {
  const pageNumber = Number(searchParams?.page || 1)
  const view = searchParams?.view || PAGE_VIEW
  const limit = PAGE_LIMIT
  const page = pageNumber
  const { data, paginationData, viewData } = await fetchFeed({
    limit,
    page,
    view,
  })

  return (
    <div className="space-y-6">
      <div className="paper-rounded hidden sm:block">
        <SToggle
          paramName="view"
          saveParam={viewData?.saveParam}
          activeValue={viewData?.view}
          defaultArrValue={[
            { value: 'grid', icon: <IconLayoutGrid /> },
            { value: 'list', icon: <IconLayoutList /> },
          ]}
        />
      </div>
      <div
        className={cn(
          'grid grid-cols-1 gap-6',
          viewData?.view === 'list'
            ? 'm-auto max-w-[800px]'
            : 'sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        )}
      >
        {data.portfolios.map((portfolio, i) => (
          <div
            key={i}
            className={cn(
              'border-box flex justify-between',
              viewData?.view === 'list' ? ' flex-row' : 'flex-col'
            )}
          >
            <div
              className={cn(viewData?.view === 'list' ? 'flex-[500px] flex-grow-0' : 'mb-3 w-full')}
            >
              <ImgPortfolio imgData={portfolio} />
            </div>
            <div className="flex flex-col px-6 pb-0">
              <div className="text-h3 mb-4 line-clamp-6">{portfolio.title}</div>
              <div className="text-s mb-1 line-clamp-6">{portfolio.description}</div>
              <div className="flex flex-1 items-center justify-end py-6">
                <Button size={'sm'} asChild>
                  <Link href={`/portfolio/${portfolio.id}`}>Read more</Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {paginationData.totalPages !== 1 && <SPagination {...paginationData} />}
    </div>
  )
}
