'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'
import dayjs from '@/lib/dayjs'

export default function CheckListWrapper() {
  const [selectedDate, setSelectedDate] = useState(
    dayjs(new Date()).tz().format('YYYY-MM-DD'),
  )

  return (
    <div>
      <CheckListController
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
      />
      <CheckList selectedDate={selectedDate} />
    </div>
  )
}
