import { useAddListItemModalActions } from '@/app/hooks/store/useAddListItemModalStore'
import { useCalendarModalActions } from '@/app/hooks/store/useCalendarModalStore'
import dayjs from '@/app/utils/dayjs'
import { useSession } from 'next-auth/react'
import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface CheckListControllerProps {
  selectedDate: Date
}

export default function CheckListController({
  selectedDate,
}: CheckListControllerProps) {
  const { data: session } = useSession()

  const { onOpen: openCalendarModal } = useCalendarModalActions()
  const { onOpen: openAddListItemModal } = useAddListItemModalActions()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const openModal = () => {
    if (session?.user.role !== 'admin' && date === today) return
    openAddListItemModal()
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <button onClick={openCalendarModal}>
        <span>🗓</span>
        <span className="ml-2 text-sm">{date}</span>
      </button>
      {session?.user.role === 'admin' && date === today && (
        <button onClick={openModal}>
          <AiOutlinePlus size={20} />
        </button>
      )}
    </div>
  )
}
