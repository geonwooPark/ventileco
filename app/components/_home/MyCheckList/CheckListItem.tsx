import React from 'react'
import { CheckListItemType } from '@/app/interfaces/interface'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import dayjs from '@/app/utils/dayjs'
import { toast } from 'react-toastify'
import useDeleteCheckListItemMutation from '@/app/hooks/mutation/useDeleteCheckListItemMutation'
import useUpdateCheckListItemMutation from '@/app/hooks/mutation/useUpdateCheckListItemMutation'

interface CheckListItemProps {
  item: CheckListItemType
  selectedDate: Date
}

export default function CheckListItem({
  item,
  selectedDate,
}: CheckListItemProps) {
  const { data: session } = useSession()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const { mutation: deleteCheckListItemMutation } =
    useDeleteCheckListItemMutation({ session, date, today })
  const deleteCheckListItem = () => {
    deleteCheckListItemMutation.mutate({
      listId: item.listId,
      session,
      today,
      date,
    })
  }

  const { mutation: updateCheckListItemMutation } =
    useUpdateCheckListItemMutation({ session, date, today })
  const updateCheckListItem = () => {
    updateCheckListItemMutation.mutate(
      {
        listId: item.listId,
        status: item.status,
        session,
        date,
        today,
      },
      {
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

  return (
    <li className="mb-3 text-sm">
      <div className="flex items-center rounded-md bg-slate-600 p-2">
        <input
          type="checkbox"
          checked={item.status}
          className={`mr-1.5 h-5 w-5 ${
            session?.user.role !== 'admin' && 'pointer-events-none'
          }`}
          onChange={updateCheckListItem}
        />
        <span className="w-full">{item.text}</span>
        {session?.user.role === 'admin' && date === today && (
          <button onClick={deleteCheckListItem}>
            <AiOutlineDelete size={20} />
          </button>
        )}
      </div>
    </li>
  )
}
