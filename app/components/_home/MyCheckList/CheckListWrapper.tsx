'use client'

import React, { useState } from 'react'
import CheckList from './CheckList'
import CheckListController from './CheckListController'
import CalendarModal from '../../common/Modal/CalendarModal'
import ModalContainer from '../../common/Modal/ModalContainer'
import AddListItemModal from '../../common/Modal/AddListItemModal'

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
