import React from 'react'
import { CheckListItemType } from '@/app/interfaces/interface'
import { AiOutlineDelete } from 'react-icons/ai'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useSession } from 'next-auth/react'
import { Session } from 'next-auth'
import dayjs from '@/app/utils/dayjs'
import { toast } from 'react-toastify'

interface CheckListItemProps {
  item: CheckListItemType
  selectedDate: Date
}

const deleteListItem = async (
  listId: string,
  session: Session | null,
  date: string,
  today: string,
) => {
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
    body: JSON.stringify({ listId, status, today }),
  })
}

export default function CheckListItem({
  item,
  selectedDate,
}: CheckListItemProps) {
  const { data: session } = useSession()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

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
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <li className="mb-3 text-sm">
      <div className="flex items-center rounded-md bg-slate-600 p-2">
        <input
          type="checkbox"
          checked={item.status}
          className={`mr-1.5 h-5 w-5 ${
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
