import React from 'react'
import { CheckListItemType } from '@/interfaces/interface'
import { AiOutlineDelete } from 'react-icons/ai'
import { useSession } from 'next-auth/react'
import dayjs from '@/lib/dayjs'
import { toast } from 'react-toastify'
import useDeleteCheckListItemMutation from '@/hooks/mutation/useDeleteCheckListItemMutation'
import useUpdateCheckListItemMutation from '@/hooks/mutation/useUpdateCheckListItemMutation'

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
    useDeleteCheckListItemMutation({ today })
  const deleteCheckListItem = () => {
    if (session?.user.role !== 'admin' || date !== today) return

    deleteCheckListItemMutation.mutate({
      listId: item.listId,
      today,
    })
  }

  const { mutation: updateCheckListItemMutation } =
    useUpdateCheckListItemMutation({ today })

  const updateCheckListItem = () => {
    if (session?.user.role !== 'admin' || date !== today) return

    updateCheckListItemMutation.mutate(
      {
        listId: item.listId,
        status: item.status,
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
      <div className="flex items-center rounded border border-brown-dark bg-beige-normal p-2">
        <input
          type="checkbox"
          checked={item.status}
          className={`mr-1.5 h-5 w-5 cursor-pointer accent-brown-normal ${
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
