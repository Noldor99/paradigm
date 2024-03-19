'use client'

import { useGetPerspectiveById } from '@/ahooks/usePerspective'

import { useParams } from 'next/navigation'

import { PerspectiveForm } from './_components/PerspectiveForm'

const PerspectiveEditPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }
  const { data: perspective, isFetched } = useGetPerspectiveById(id as string)

  return (
    <div className="container-sm">
      {id === 'Add' ? (
        <PerspectiveForm />
      ) : (
        isFetched && <PerspectiveForm perspective={perspective} />
      )}
    </div>
  )
}

export default PerspectiveEditPage
