'use client'

import { useGetFeedback } from '@/ahooks/useFeedback'

import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import WrapPagination from '@/components/pagination/WrapPagination'
import Line from '@/components/ui/line'

import { cn } from '@/lib/utils'

const FeedbackList = () => {
  const searchParams = useSearchParams()

  const getResult = useGetFeedback({
    enabled: true,
    params: {
      limit: '6',
      page: searchParams?.get('page') || '1',
      // search: searchParams?.get("search") || undefined,
    },
  })

  const { data: feedbackData, isFetched, refetch } = getResult

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <>
      <div className={cn('flex w-full flex-col items-center justify-start gap-2')}>
        {feedbackData?.feedbacks.map((item, idx) => (
          <div key={idx} className="paper-rounded w-full">
            <p className="text-h3">{item.title}</p>
            <p className="">{item.description}</p>
            <p className="text-end">{item.email}</p>
            <Line />
          </div>
        ))}
      </div>
      {feedbackData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {feedbackData && feedbackData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={feedbackData?.totalCount} />
        </div>
      )}
    </>
  )
}

export default FeedbackList
