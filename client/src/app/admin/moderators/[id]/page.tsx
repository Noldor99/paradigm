'use client'

import { useGetUserById } from '@/ahooks/useUser'

import { useParams } from 'next/navigation'

import { PersonForm } from './_components/PersonForm'

const PersonEditPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }
  const { data: user, isFetched } = useGetUserById(id as string)

  return (
    <div className="container-sm">
      {user?.person?.id ? (
        <PersonForm person={user?.person} userId={user?.id} />
      ) : (
        isFetched && <PersonForm userId={user?.id} />
      )}
    </div>
  )
}

export default PersonEditPage
