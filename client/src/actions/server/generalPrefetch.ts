import { queryClient } from '@/lib/queryClient'
import { apiGeneral, ReturnType } from '../client/generalAction'

export const generalPrefetch = async (returnType: ReturnType) => {
  const key = ['general']
  return queryClient.fetchQuery({
    queryKey: key,
    queryFn: () => apiGeneral.getGeneralData(returnType)
  })
}

