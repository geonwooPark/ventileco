import { useAddListItemModalActions } from '@/hooks/store/useAddListItemModalStore'
import { useCalendarModalActions } from '@/hooks/store/useCalendarModalStore'
import dayjs from '@/lib/dayjs'
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

  const { handleModal: handleCalendarModal } = useCalendarModalActions()
  const { handleModal: handleAddListItemModal } = useAddListItemModalActions()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const openModal = () => {
    if (session?.user.role !== 'admin' && date === today) return
    handleAddListItemModal()
  }

  return (
    <div className="mb-4 flex items-center justify-between">
      <button onClick={handleCalendarModal}>
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
