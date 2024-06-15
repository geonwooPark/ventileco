'use client'

import React, { useState } from 'react'
import dayjs from '@/lib/dayjs'
import dynamic from 'next/dynamic'

const CheckListController = dynamic(() => import('./CheckListController'))
const CheckList = dynamic(() => import('./CheckList'))

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
