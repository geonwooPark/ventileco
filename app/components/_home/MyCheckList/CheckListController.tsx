import AddListItemModal from '@/components/common/Modal/AddListItemModal'
import CalendarModal from '@/components/common/Modal/CalendarModal'
import { useModalActions } from '@/hooks/store/useModalStore'
import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import { AiOutlinePlus } from 'react-icons/ai'

interface CheckListControllerProps {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CheckListController({
  selectedDate,
  setSelectedDate,
}: CheckListControllerProps) {
  const { data: session } = useSession()

  const { addModal } = useModalActions()

  const date = dayjs(selectedDate).tz().format('YYYY-MM-DD')
  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const openAddListItemModal = useCallback(() => {
    if (session?.user.role !== 'admin' && date === today) return
    addModal({
      key: 'addListItem-modal',
      component: () => <AddListItemModal />,
    })
  }, [session])

  const openCalendarModal = useCallback(() => {
    addModal({
      key: 'calendar-modal',
      component: () => <CalendarModal setSelectedDate={setSelectedDate} />,
    })
  }, [])

  return (
    <div className="mb-4 flex items-center justify-between">
      <button onClick={openCalendarModal}>
        <span>🗓</span>
        <span className="ml-2 text-sm">{date}</span>
      </button>
      {session?.user.role === 'admin' && date === today && (
        <button onClick={openAddListItemModal}>
          <AiOutlinePlus size={20} />
        </button>
      )}
    </div>
  )
}
