import React from 'react'
import { CheckListType } from '@/app/interfaces/interface'
import { AiOutlineDelete } from 'react-icons/ai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import dayjs from 'dayjs'

interface CheckListItemProps {
  item: CheckListType
  selectedDate: Date
}

const deleteListItem = async (
  itemId: string,
  session: Session | null,
  date: string,
  today: string,
) => {
  if (session?.user.role !== 'admin' || date !== today) return
  await fetch('/api/check-list', {
    method: 'DELETE',
    body: JSON.stringify(itemId),
  })
}

const changeStatus = async (
  listId: string,
  status: boolean,
  session: Session | null,
  date: string,
  today: string,
) => {
  if (session?.user.role !== 'admin' || date !== today) return
  await fetch('/api/check-list', {
    method: 'PATCH',
    body: JSON.stringify({ listId, status }),
  })
}

export default function CheckListItem({
  item,
  selectedDate,
}: CheckListItemProps) {
  const { data: session } = useSession()

  const date = dayjs(selectedDate).format('YYYY-MM-DD')
  const today = dayjs(new Date()).format('YYYY-MM-DD')

  const queryClient = useQueryClient()
  const { mutate: deleteItemMutation } = useMutation({
    mutationFn: () => deleteListItem(item.listId, session, date, today),
    onSuccess: () => {
      if (session?.user.role !== 'admin' || date !== today) return
      queryClient.invalidateQueries({ queryKey: ['checklist'] })
    },
  })

  const { mutate: changeStatusMutation } = useMutation({
    mutationFn: () =>
      changeStatus(item.listId, item.status, session, date, today),
    onSuccess: () => {
      if (session?.user.role !== 'admin' || date !== today) return
      queryClient.invalidateQueries({ queryKey: ['checklist'] })
    },
  })

  return (
    <li className="mb-3 text-sm">
      <div className="flex items-center px-2 py-2 bg-slate-500 rounded-md">
        <input
          type="checkbox"
          checked={item.status}
          className={`mr-1.5 w-5 h-5 ${
            session?.user.role !== 'admin' && 'pointer-events-none'
          }`}
          onChange={() => changeStatusMutation()}
        />
        <span className="w-full">{item.text}</span>
        {session?.user.role === 'admin' && date === today && (
          <button onClick={() => deleteItemMutation()}>
            <AiOutlineDelete size={20} />
          </button>
        )}
      </div>
    </li>
  )
}
