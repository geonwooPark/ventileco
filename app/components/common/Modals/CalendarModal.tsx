import React, { useState } from 'react'
import Modal from './Modal/Modal'
import 'react-calendar/dist/Calendar.css'
import styles from '@/styles/calendar.module.css'
import Calendar from 'react-calendar'
import dayjs from '@/lib/dayjs'
import { useModalActions } from '@/hooks/store/useModalStore'
import Button from '../Button'

interface CalendarModalProps {
  selectedDate: string
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>
}

export default function CalendarModal({
  selectedDate,
  setSelectedDate,
}: CalendarModalProps) {
  const { removeModal } = useModalActions()

  const [value, setValue] = useState(selectedDate)

  const changeDate = (e: any) => {
    setValue(dayjs(e).tz().format('YYYY-MM-DD'))
  }

  const onSubmit = () => {
    setSelectedDate(value)
    removeModal()
  }

  return (
    <Modal>
      <Modal.Dim>
        <Modal.Card size="small">
          <Modal.Header>
            <Modal.Title>Date</Modal.Title>
            <Modal.CloseButton />
          </Modal.Header>
          <Modal.Content>
            <div className={`${styles.wrapper} mb-4 flex justify-center`}>
              <Calendar
                onChange={changeDate}
                value={value}
                formatDay={(locale, date) => dayjs(date).tz().format('DD')}
              />
            </div>
            <Button
              type="button"
              level="primary"
              size="s"
              label="조회하기"
              fullWidth={true}
              onClick={onSubmit}
            />
          </Modal.Content>
        </Modal.Card>
      </Modal.Dim>
    </Modal>
  )
}
