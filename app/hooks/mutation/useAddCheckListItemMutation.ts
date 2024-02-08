import { homeKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface AddCheckListItemParams {
  session: Session | null
  value: string
  today: string
}

const addCheckListItem = async ({
  session,
  value,
  today,
}: AddCheckListItemParams) => {
  if (session?.user.role !== 'admin') return

  await fetch('/api/home/check-list', {
    method: 'POST',
    body: JSON.stringify({ value, today }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useAddCheckListItemMutation({
  today,
}: {
  today: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ session, value, today }: AddCheckListItemParams) =>
      addCheckListItem({ session, value, today }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: homeKeys.checkList(today),
      })
    },
  })
  return { mutation }
}
