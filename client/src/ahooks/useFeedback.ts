import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  IFeedbackSchema,
  QueryFeedbackParams,
  apiFeedback,
} from '@/actions/client/feedbackAction'


export const useCreateFeedback = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: apiFeedback.create,
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['feedback'],
      })
    },
  })
}

export const useUpdateFeedback = (id: string) => {

  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: IFeedbackSchema) => apiFeedback.update(id!, body),
    onSuccess: () => {

      queryClient.invalidateQueries({
        queryKey: ['feedback'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['feedback', id],
      // })
    },
  })
}

export const useGetFeedback = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryFeedbackParams
}) =>
  useQuery({
    queryKey: ['feedback'],
    queryFn: () => apiFeedback.getAll(params ?? {}),
    enabled,
  })

export const useDeleteFeedbackById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiFeedback.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['feedback'],
      })
    },
  })
}

export const useGetFeedbackById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['feedback', id],
    queryFn: () => apiFeedback.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['feedback'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


