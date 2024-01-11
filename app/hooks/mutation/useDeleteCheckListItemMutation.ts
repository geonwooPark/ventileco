import { homeKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface DeleteCheckListItemParams {
  listId: string
  session: Session | null
  date: string
  today: string
}

const deleteCheckListItem = async ({
  listId,
  session,
  date,
  today,
}: DeleteCheckListItemParams) => {
  if (session?.user.role !== 'admin' || date !== today) return
  await fetch('/api/check-list', {
    method: 'DELETE',
    body: JSON.stringify({ listId, today }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useDeleteCheckListItemMutation({
  session,
  date,
  today,
}: Pick<DeleteCheckListItemParams, 'session' | 'date' | 'today'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ listId, session, date, today }: DeleteCheckListItemParams) =>
      deleteCheckListItem({ listId, session, date, today }),
    onSuccess: () => {
      if (session?.user.role !== 'admin' || date !== today) return
      queryClient.invalidateQueries({
        queryKey: homeKeys.checkList(today),
      })
    },
  })

  return { mutation }
}
