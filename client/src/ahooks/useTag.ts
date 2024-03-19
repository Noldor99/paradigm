import { useRouter } from 'next/navigation'

import { useEffect } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  ITagSchema,
  QueryTagParams,
  apiTag,
} from '@/actions/client/tagAction'


export const useCreateTag = () => {
  const queryClient = useQueryClient()
  const { push } = useRouter()
  return useMutation({
    mutationFn: apiTag.create,
    onSuccess: () => {
      push('/admin/tag')
      queryClient.invalidateQueries({
        queryKey: ['tag'],
      })
    },
  })
}

export const useUpdateTag = (id: string) => {
  const { push } = useRouter()
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: ITagSchema) => apiTag.update(id!, body),
    onSuccess: () => {
      push('/admin/tag')
      queryClient.invalidateQueries({
        queryKey: ['tag'],
      })
      // queryClient.invalidateQueries({
      //   queryKey: ['tag', id],
      // })
    },
  })
}

export const useGetTag = ({
  enabled = true,
  params,
}: {
  enabled?: boolean
  params?: QueryTagParams
}) =>
  useQuery({
    queryKey: ['tag'],
    queryFn: () => apiTag.getAll(params ?? {}),
    enabled,
  })

export const useDeleteTagById = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => apiTag.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tag'],
      })
    },
  })
}

export const useGetTagById = (id: string) => {
  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['tag', id],
    queryFn: () => apiTag.getOne(id),
    enabled: !!id && id !== 'Add',
  })
  const { isSuccess } = query

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({
        queryKey: ['tag'],
      })
    }
  }, [isSuccess, queryClient])

  return query
}


