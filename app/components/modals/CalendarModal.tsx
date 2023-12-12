import React, { useState } from 'react'
import Modal from './Modal'
import 'react-calendar/dist/Calendar.css'
import useCalendarModal from '@/app/hooks/useCalendarModal'
import Calendar from 'react-calendar'
import dayjs from '@/app/utils/dayjs'

interface CalendarModalProps {
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export default function CalendarModal({ setSelectedDate }: CalendarModalProps) {
  const [value, setValue] = useState(new Date())

  const calendarModal = useCalendarModal()

  const changeDate = (e: any) => {
    setValue(e)
  }

  const onSubmit = () => {
    setSelectedDate(value)
    calendarModal.onClose()
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
      isOpen={calendarModal.isOpen}
      onClose={calendarModal.onClose}
      onSubmit={onSubmit}
      actionLabel="조회"
    />
  )
}
