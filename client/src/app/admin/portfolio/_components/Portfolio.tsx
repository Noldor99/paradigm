'use client'

import { useDeletePortfolioById, useGetPortfolio } from '@/ahooks/usePortfolio'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import { IconPencil, IconPlus } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import SmalCardIcon from '@/components/card/SmalCardIcon'
import ImgPortfolio from '@/components/imgWrap/ImgPortfolio'
import WrapPagination from '@/components/pagination/WrapPagination'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const Portfolio = () => {
  const searchParams = useSearchParams()

  const getResult = useGetPortfolio({
    enabled: true,
    params: {
      limit: 6,
      page: searchParams?.get('page') || 1,
      // search: searchParams?.get("search") || undefined,
    },
  })

  const { data: portfolioData, isFetched, refetch } = getResult

  const { mutate: deletePortfolio } = useDeletePortfolioById()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="container-sm m-0">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <Button asChild variant="black_out">
          <Link href={'/admin/portfolio/Add'}>
            <IconPlus className="mr-2" />
            Add news
          </Link>
        </Button>
      </div>
      <div className={cn('flex flex-col items-center justify-start gap-2')}>
        {portfolioData?.portfolios.map((item, idx) => (
          <SmalCardIcon
            key={idx}
            img={
              <div className="flex-[250px]">
                <ImgPortfolio imgData={item} />
              </div>
            }
            title={item.title}
            subTitle="simple"
          >
            <Link href={`/admin/portfolio/${item.id}`}>
              <Button className="p-2">
                <IconPencil />
              </Button>
            </Link>
            <DialogDelete
              nameDelete="SomeItem"
              onClick={() => {
                deletePortfolio(item.id)
              }}
            />
          </SmalCardIcon>
        ))}
      </div>
      {portfolioData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {portfolioData && portfolioData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={portfolioData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default Portfolio
