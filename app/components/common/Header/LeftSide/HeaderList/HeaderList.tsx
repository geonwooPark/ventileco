import { headerListItem } from '@/constants'
import React from 'react'
import HeaderListItem from './HeaderListItem'

export default function HeaderList() {
  return (
    <ul className="relative z-50 flex gap-4">
      {headerListItem.map((item) => (
        <HeaderListItem key={item.id} item={item} />
      ))}
    </ul>
  )
}
