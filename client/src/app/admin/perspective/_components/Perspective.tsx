'use client'

import { useDeletePerspectiveById, useGetPerspective } from '@/ahooks/usePerspective'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import { IconPencil, IconPlus } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import SmalCardIcon from '@/components/card/SmalCardIcon'
import ImgPerspective from '@/components/imgWrap/ImgPerspective'
import WrapPagination from '@/components/pagination/WrapPagination'
import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'

const Perspective = () => {
  const searchParams = useSearchParams()

  const getResult = useGetPerspective({
    enabled: true,
    params: {
      limit: 6,
      page: searchParams?.get('page') || 1,
      // search: searchParams?.get("search") || undefined,
    },
  })

  const { data: perspectiveData, isFetched, refetch } = getResult

  const { mutate: deletePerspective } = useDeletePerspectiveById()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])

  return (
    <div className="container-sm m-0">
      <div className="mb-5 flex flex-wrap items-start justify-start gap-4">
        <Button asChild variant="black_out">
          <Link href={'/admin/perspective/Add'}>
            <IconPlus className="mr-2" />
            Add news
          </Link>
        </Button>
      </div>
      <div className={cn('flex flex-col items-center justify-start gap-2')}>
        {perspectiveData?.perspectives.map((item, idx) => (
          <SmalCardIcon
            key={idx}
            img={
              <div className="flex-[250px]">
                <ImgPerspective imgData={item} />
              </div>
            }
            title={item.title}
          >
            <Link href={`/admin/perspective/${item.id}`}>
              <Button className="p-2">
                <IconPencil />
              </Button>
            </Link>
            <DialogDelete
              nameDelete="SomeItem"
              onClick={() => {
                deletePerspective(item.id)
              }}
            />
          </SmalCardIcon>
        ))}
      </div>
      {perspectiveData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {perspectiveData && perspectiveData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={perspectiveData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default Perspective
