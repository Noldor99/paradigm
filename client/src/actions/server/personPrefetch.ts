import { queryClient } from '@/lib/queryClient'
import { QueryPersonParams, apiPerson } from '../client/personAction'

export const personPrefetch = async (params: QueryPersonParams) => {
  const key = ['user']
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPerson.getAll(params) })
}

export const personByIdPrefetch = async (id: string) => {
  const key = ['user', id]
  return queryClient.fetchQuery({ queryKey: key, queryFn: () => apiPerson.getOne(id) })
}
