'use client'

import { useDeleteUser, useGetUser } from '@/ahooks/useUser'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

import { useEffect } from 'react'

import { IconPencil, IconPlus } from '@tabler/icons-react'

import DialogDelete from '@/components/DialogDelete'
import SmalCardIcon from '@/components/card/SmalCardIcon'
import ImgPerson from '@/components/imgWrap/ImgPerson'
import WrapPagination from '@/components/pagination/WrapPagination'
import { Button } from '@/components/ui/button'

import { useUserStore } from '@/store'

import { cn } from '@/lib/utils'

import { UserForm } from './UserForm'

const Moderator = () => {
  const { user } = useUserStore()

  const searchParams = useSearchParams()

  const getResult = useGetUser({
    enabled: true,
    params: {
      limit: '6',
      page: searchParams?.get('page') || '1',
      // search: searchParams?.get("search") || undefined,
    },
  })

  const { data: userData, isFetched, refetch } = getResult

  const { mutate: deleteUser } = useDeleteUser()

  useEffect(() => {
    refetch()
  }, [refetch, searchParams])
  return (
    <div className="container-sm m-0">
      <div className="paper-rounded max-w-[400px]">
        <p className="text-h3">Edit your profile</p>
        {user && <UserForm user={user} />}
      </div>
      <div className={cn('mt-4 flex flex-col items-center justify-start gap-2')}>
        {userData?.users.map((item, idx) => (
          <SmalCardIcon key={idx} title={item.username} subTitle={item.email}>
            <Link href={`/admin/moderators/${item.id}`}>
              <Button className="p-2">
                <IconPencil />
              </Button>
            </Link>
            <DialogDelete
              nameDelete="SomeItem"
              onClick={() => {
                deleteUser(item.id)
              }}
            />
          </SmalCardIcon>
        ))}
      </div>
      {userData?.totalCount === 0 && (
        <div className="paper-rounded flex justify-center"> ~list empty~</div>
      )}
      {userData && userData.totalCount > 6 && (
        <div className="mt-8">
          <WrapPagination totalCount={userData?.totalCount} />
        </div>
      )}
    </div>
  )
}

export default Moderator
