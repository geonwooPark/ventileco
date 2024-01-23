import { hotPlaceKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface deleteHotPlaceParams {
  session: Session | null
  storeId: string
  creator: string
}

const deleteStore = async ({
  session,
  storeId,
  creator,
}: deleteHotPlaceParams) => {
  if (!session) throw new Error('권한이 없습니다!')
  if (session.user.role !== 'admin' && session.user.id !== creator) {
    throw new Error('권한이 없습니다!')
  }
  const result = await fetch('/api/hot-place', {
    method: 'DELETE',
    body: JSON.stringify(storeId),
  })
  if (!result.ok) {
    throw new Error('스토어 제거에 실패했습니다.')
  }
}

export default function useDeleteHotPlaceMutation() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ session, storeId, creator }: deleteHotPlaceParams) =>
      deleteStore({ session, storeId, creator }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: hotPlaceKeys.hotPlaceListing(),
      })
    },
  })

  return { mutation }
}
