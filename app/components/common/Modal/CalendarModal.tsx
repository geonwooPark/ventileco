import React, { memo, useState } from 'react'
import Modal from './Modal'
import 'react-calendar/dist/Calendar.css'
import styles from '@/styles/calendar.module.css'
import Calendar from 'react-calendar'
import dayjs from '@/lib/dayjs'
import { useIsModalOpen, useModalActions } from '@/hooks/store/useModalStore'

interface CalendarModalProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default memo(function CalendarModal({
  setSelectedDate,
}: CalendarModalProps) {
  const isModalOpen = useIsModalOpen()
  const { removeModal } = useModalActions()

  const [value, setValue] = useState(
    dayjs(new Date()).tz().format('YYYY-MM-DD'),
  )

  const changeDate = (e: any) => {
    setValue(dayjs(e).tz().format('YYYY-MM-DD'))
  }

  const onClose = () => {
    removeModal('calendar-modal')
  }

  const onSubmit = () => {
    setSelectedDate(value)
    onClose()
  }

  const bodyContent = (
    <div className={`${styles.wrapper} flex justify-center`}>
      <Calendar
        onChange={changeDate}
        value={value}
        formatDay={(locale, date) => dayjs(date).tz().format('DD')}
      />
    </div>
  )

  return (
    <Modal
      title="Date"
      body={bodyContent}
      isOpen={isModalOpen}
      onClose={onClose}
      onSubmit={onSubmit}
      actionLabel="조회하기"
    />
  )
})
