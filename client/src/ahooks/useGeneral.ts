import { IGeneralSchema, apiGeneral, ReturnType } from '@/actions/client/generalAction'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'



export const useUpdateGeneral = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (body: FormData | IGeneralSchema) => apiGeneral.update(body),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['general'],
      })
    },
  })
}

export const useGetGeneral = ({ enabled = true }: { enabled?: boolean }) =>
  useQuery({
    queryKey: ['general'],
    queryFn: () => apiGeneral.getOne(),
    enabled,
  })

export const useGetGeneralData = ({
  returnType,
  enabled = true,
}: {
  returnType?: ReturnType;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ['general', returnType],
    queryFn: () => apiGeneral.getGeneralData(returnType),
    enabled,
  })
