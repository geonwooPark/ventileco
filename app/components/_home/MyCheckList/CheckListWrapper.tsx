'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'
import CalendarModal from '../../common/Modal/CalendarModal'
import AddListItemModal from '../../common/Modal/AddListItemModal'

export default function CheckListWrapper() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      <AddListItemModal />
      <CalendarModal setSelectedDate={setSelectedDate} />
      <CheckListController selectedDate={selectedDate} />
      <CheckList selectedDate={selectedDate} />
    </div>
  )
}
