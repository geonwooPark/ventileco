'use client'

import React, { useState } from 'react'
import CalendarModal from '../../modals/CalendarModal'
import ModalContainer from '../../modals/ModalContainer'
import CheckList from './CheckList'
import AddListItemModal from '../../modals/AddListItemModal'
import CheckListController from './CheckListController'

export default function CheckListWrapper() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div>
      <ModalContainer>
        <CalendarModal setSelectedDate={setSelectedDate} />
        <AddListItemModal />
      </ModalContainer>
      <CheckListController selectedDate={selectedDate} />
      <CheckList selectedDate={selectedDate} />
    </div>
  )
}
