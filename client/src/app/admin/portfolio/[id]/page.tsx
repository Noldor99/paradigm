'use client'

import { useGetPortfolioById } from '@/ahooks/usePortfolio'

import { useParams } from 'next/navigation'

import { PortfolioForm } from './_components/PortfolioForm'

const PortfolioEditPage = () => {
  const { id } = useParams<{ id: string }>() ?? { id: '' }
  const { data: portfolio, isFetched } = useGetPortfolioById(id as string)

  return (
    <div className="container-sm">
      {id === 'Add' ? <PortfolioForm /> : isFetched && <PortfolioForm portfolio={portfolio} />}
    </div>
  )
}

export default PortfolioEditPage
