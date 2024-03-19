import { queryClient } from '@/lib/queryClient'
import { QueryTagParams, apiTag } from '../client/tagAction'

export const tagPrefetch = async (params: QueryTagParams) => {
  const key = ['tag']
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiTag.getAll(params) })
}

export const tagByIdPrefetch = async (id: string) => {
  const key = ['tag', id]
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiTag.getOne(id) })
}
