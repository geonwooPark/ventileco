import React, { useState } from 'react'
import Modal from './Modal'
import 'react-calendar/dist/Calendar.css'
import styles from '@/styles/calendar.module.css'
import Calendar from 'react-calendar'
import dayjs from '@/lib/dayjs'
import {
  useCalendarModalActions,
  useIsCalendarModalOpen,
} from '@/hooks/store/useCalendarModalStore'

interface CalendarModalProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CalendarModal({ setSelectedDate }: CalendarModalProps) {
  const [value, setValue] = useState(new Date())

  const isCalendarModalOpen = useIsCalendarModalOpen()
  const { handleModal: handleCalendarModal } = useCalendarModalActions()

  const changeDate = (e: any) => {
    setValue(e)
  }

  const onSubmit = () => {
    setSelectedDate(value)
    handleCalendarModal()
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
      isOpen={isCalendarModalOpen}
      onClose={handleCalendarModal}
      onSubmit={onSubmit}
      actionLabel="조회하기"
    />
  )
}
