import { useModalActions } from '@/hooks/store/useModalStore'
import dayjs from '@/lib/dayjs'
import { useSession } from 'next-auth/react'
import React, { useCallback } from 'react'
import { IconPlus } from '../../../../public/svgs/icons'
import CalendarModal from '@/components/common/Modals/CalendarModal'
import AddListItemModal from '@/components/common/Modals/AddListItemModal'

interface CheckListControllerProps {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function CheckListController({
  selectedDate,
  setSelectedDate,
}: CheckListControllerProps) {
  const { data: session } = useSession()

  const { addModal } = useModalActions()

  const today = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const openAddListItemModal = useCallback(() => {
    if (session?.user.role !== 'admin' && selectedDate === today) return
    addModal(<AddListItemModal />)
  }, [session])

  const openCalendarModal = useCallback(() => {
    addModal(
      <CalendarModal
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />,
    )
  }, [selectedDate])

  return (
    <div className="mb-4 flex items-center justify-between">
      <button onClick={openCalendarModal}>
        <span>🗓</span>
        <span className="ml-2 text-sm">{selectedDate}</span>
      </button>
      {session?.user.role === 'admin' && selectedDate === today && (
        <button onClick={openAddListItemModal} className="size-5">
          <IconPlus />
        </button>
      )}
    </div>
  )
}
