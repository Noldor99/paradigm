import { queryClient } from '@/lib/queryClient'
import { QueryPerspectiveParams, apiPerspective } from '../client/perspectiveAction'

export const perspectivePrefetch = async (params: QueryPerspectiveParams) => {
  const key = ['perspective']
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPerspective.getAll(params) })
}

export const perspectiveByIdPrefetch = async (id: string) => {
  const key = ['perspective', id]
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPerspective.getOne(id) })
}
