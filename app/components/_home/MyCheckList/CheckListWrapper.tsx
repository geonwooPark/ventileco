'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'

export default function CheckListWrapper() {
  const [selectedDate, setSelectedDate] = useState(new Date())

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
