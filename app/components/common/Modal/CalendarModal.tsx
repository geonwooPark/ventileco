import React, { useState } from 'react'
import Modal from './Modal'
import 'react-calendar/dist/Calendar.css'
import Calendar from 'react-calendar'
import dayjs from '@/lib/dayjs'
import {
  useCalendarModalActions,
  useCalendarModalIsOpen,
} from '@/hooks/store/useCalendarModalStore'

interface CalendarModalProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CalendarModal({ setSelectedDate }: CalendarModalProps) {
  const [value, setValue] = useState(new Date())

  const calendarModalIsOpen = useCalendarModalIsOpen()
  const { onClose: closeCalendarModal } = useCalendarModalActions()

  const changeDate = (e: any) => {
    setValue(e)
  }

  const onSubmit = () => {
    setSelectedDate(value)
    closeCalendarModal()
  }

  const bodyContent = (
    <div className="flex justify-center">
      <Calendar
        onChange={changeDate}
        value={value}
        formatDay={(locale, date) => dayjs(date).tz().format('DD')}
      ></Calendar>
    </div>
  )

  return (
    <Modal
      title="날짜"
      body={bodyContent}
      isOpen={calendarModalIsOpen}
      onClose={closeCalendarModal}
      onSubmit={onSubmit}
      actionLabel="조회"
    />
  )
}
