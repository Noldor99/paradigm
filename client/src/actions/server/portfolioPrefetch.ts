import { queryClient } from '@/lib/queryClient'
import { QueryPortfolioParams, apiPortfolio } from '../client/portfolioAction'

export const portfolioPrefetch = async (params: QueryPortfolioParams) => {
  const key = ['portfolio']
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPortfolio.getAll(params) })
}

export const portfolioByIdPrefetch = async (id: string) => {
  const key = ['portfolio', id]
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPortfolio.getOne(id) })
}
