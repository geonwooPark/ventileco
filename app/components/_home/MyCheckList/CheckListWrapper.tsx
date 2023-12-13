'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'
import ModalContainer from '../../common/modals/ModalContainer'
import CalendarModal from '../../common/modals/CalendarModal'
import AddListItemModal from '../../common/modals/AddListItemModal'

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
