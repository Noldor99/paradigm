import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  QueryPortfolioParams,
  apiPortfolio,
} from '@/actions/client/portfolioAction'


export const useCreatePortfolio = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiPortfolio.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio'],
      })
    },
  })
}

export const useUpdatePortfolio = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FormData) => apiPortfolio.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['portfolio', id],
      // })
    },
  })
}

export const useGetPortfolio = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryPortfolioParams
}) =>
  useQuery({
    queryKey: ['portfolio'],
    queryFn: () => apiPortfolio.getAll(params ?? {}),
    enabled,
  })

export const useDeletePortfolioById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiPortfolio.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['portfolio'],
      })
    },
  })
}

export const useGetPortfolioById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['portfolio', id],
    queryFn: () => apiPortfolio.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['portfolio'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


