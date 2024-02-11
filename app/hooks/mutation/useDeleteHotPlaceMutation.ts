import { hotPlaceKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface deleteHotPlaceParams {
  storeId: string
  creator: string
}

const deleteStore = async ({ storeId, creator }: deleteHotPlaceParams) => {
  const result = await fetch('/api/hot-place', {
    method: 'DELETE',
    body: JSON.stringify({ storeId, creator }),
  })
  if (!result.ok) {
    throw new Error('스토어 제거에 실패했습니다.')
  }
}

export default function useDeleteHotPlaceMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ storeId, creator }: deleteHotPlaceParams) =>
      deleteStore({ storeId, creator }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
