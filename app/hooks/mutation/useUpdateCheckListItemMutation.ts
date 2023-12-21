import { checkListKeys } from '@/app/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface UpdateStatus {
  listId: string
  status: boolean
  session: Session | null
  date: string
  today: string
}

const changeStatus = async ({
  listId,
  status,
  session,
  date,
  today,
}: UpdateStatus) => {
  if (session?.user.role !== 'admin' || date !== today) return
  await fetch('/api/check-list', {
    method: 'PATCH',
    body: JSON.stringify({ listId, status, today }),
  })
}

export default function useUpdateCheckListItemMutation({
  session,
  date,
  today,
}: Pick<UpdateStatus, 'session' | 'date' | 'today'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ listId, status, session, date, today }: UpdateStatus) =>
      changeStatus({ listId, status, session, date, today }),
    onSuccess: () => {
      if (session?.user.role !== 'admin' || date !== today) return
      queryClient.invalidateQueries({
        queryKey: checkListKeys.checkList(today),
      })
    },
  })
  return { mutation }
}
