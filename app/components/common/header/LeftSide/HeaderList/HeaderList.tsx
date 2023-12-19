import { headerListItem } from '@/app/constants'
import React from 'react'
import HeaderListItem from './HeaderListItem'

export default function HeaderList() {
  return (
    <ul className="relative z-50 flex gap-4">
      {headerListItem.map((item) => (
        <HeaderListItem key={item._id} item={item} />
      ))}
    </ul>
  )
}
