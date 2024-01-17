import { hotPlaceKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface deleteHotPlaceParams {
  session: Session | null
  storeId: string
}

const deleteStore = async ({ session, storeId }: deleteHotPlaceParams) => {
  if (!(session && session.user.role === 'admin')) return

  const result = await fetch('/api/hot-place', {
    method: 'DELETE',
    body: JSON.stringify(storeId),
  })
  if (!result.ok) {
    throw new Error('스토어 제거에 실패했습니다.')
  }
}

export default function useDeleteHotPlace() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ session, storeId }: deleteHotPlaceParams) =>
      deleteStore({ session, storeId }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
