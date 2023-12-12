import useAddListItemModal from '@/app/hooks/useAddListItemModal'
import useCalendarModal from '@/app/hooks/useCalendarModal'
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

  const calendarModal = useCalendarModal()
  const addListItemModal = useAddListItemModal()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const openModal = () => {
    if (session?.user.role !== 'admin' && date === today) return
    addListItemModal.onOpen()
  }

  return (
    <div className="flex justify-between items-center mb-4">
      <button onClick={calendarModal.onOpen}>
        <span>🗓</span>
        <span className="text-sm ml-2">{date}</span>
      </button>
      {session?.user.role === 'admin' && date === today && (
        <button onClick={openModal}>
          <AiOutlinePlus size={20} />
        </button>
      )}
    </div>
  )
}
