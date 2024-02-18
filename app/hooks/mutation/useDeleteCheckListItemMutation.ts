import { homeKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface DeleteCheckListItemParams {
  listId: string
  today: string
}

const deleteCheckListItem = async ({
  listId,

  today,
}: DeleteCheckListItemParams) => {
  const result = await fetch('/api/home/check-list', {
    method: 'DELETE',
    body: JSON.stringify({ listId, today }),
  })
  if (!result.ok) throw new Error('체크리스트 삭제에 실패했습니다!')
}

export default function useDeleteCheckListItemMutation({
  today,
}: {
  today: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ listId, today }: DeleteCheckListItemParams) =>
      deleteCheckListItem({ listId, today }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: homeKeys.checkList(today),
      })
    },
  })

  return { mutation }
}
