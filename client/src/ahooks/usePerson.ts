import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  QueryPersonParams,
  apiPerson,
} from '@/actions/client/personAction'


export const useCreatePerson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: apiPerson.create,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}

export const useUpdatePerson = (id: string) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FormData) => apiPerson.update(id!, body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['person', id],
      // })
    },
  })
}

export const useGetPerson = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryPersonParams
}) =>
  useQuery({
    queryKey: ['user'],
    queryFn: () => apiPerson.getAll(params ?? {}),
    enabled,
  })

export const useDeletePersonById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiPerson.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    },
  })
}

export const useGetPersonById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['user', id],
    queryFn: () => apiPerson.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['user'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


