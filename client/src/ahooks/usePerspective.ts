import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  QueryPerspectiveParams,
  apiPerspective,
} from '@/actions/client/perspectiveAction'


export const useCreatePerspective = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiPerspective.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['perspective'],
      })
    },
  })
}

export const useUpdatePerspective = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FormData) => apiPerspective.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['perspective'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['perspective', id],
      // })
    },
  })
}

export const useGetPerspective = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryPerspectiveParams
}) =>
  useQuery({
    queryKey: ['perspective'],
    queryFn: () => apiPerspective.getAll(params ?? {}),
    enabled,
  })

export const useDeletePerspectiveById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiPerspective.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['perspective'],
      })
    },
  })
}

export const useGetPerspectiveById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['perspective', id],
    queryFn: () => apiPerspective.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['perspective'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


