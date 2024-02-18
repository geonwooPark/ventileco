import { homeKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AddCheckListItemParams {
  value: string
  today: string
}

const addCheckListItem = async ({ value, today }: AddCheckListItemParams) => {
  const result = await fetch('/api/home/check-list', {
    method: 'POST',
    body: JSON.stringify({ value, today }),
  })
  if (!result.ok) throw new Error('체크리스트 추가에 실패했습니다!')
}

export default function useAddCheckListItemMutation({
  today,
}: {
  today: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ value, today }: AddCheckListItemParams) =>
      addCheckListItem({ value, today }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: homeKeys.checkList(today),
      })
    },
  })
  return { mutation }
}
