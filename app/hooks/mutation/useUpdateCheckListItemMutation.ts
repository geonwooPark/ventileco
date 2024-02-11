import { homeKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateStatus {
  listId: string
  status: boolean
  today: string
}

const changeStatus = async ({ listId, status, today }: UpdateStatus) => {
  const result = await fetch('/api/home/check-list', {
    method: 'PATCH',
    body: JSON.stringify({ listId, status, today }),
  })
  if (!result.ok) {
    throw new Error('체크리스트 상태 변경에 실패했습니다!')
  }
}

export default function useUpdateCheckListItemMutation({
  today,
}: {
  today: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ listId, status, today }: UpdateStatus) =>
      changeStatus({ listId, status, today }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: homeKeys.checkList(today),
      })
    },
  })
  return { mutation }
}
