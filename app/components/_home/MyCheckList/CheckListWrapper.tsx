'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'
import CalendarModal from '../../common/Modals/CalendarModal'
import ModalContainer from '../../common/Modals/ModalContainer'
import AddListItemModal from '../../common/Modals/AddListItemModal'

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
