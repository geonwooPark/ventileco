import { headerListItem } from '@/constants'
import React from 'react'
import HeaderListItem from './HeaderListItem'

interface HeaderListProps {
  path: string
}

export default function HeaderList({ path }: HeaderListProps) {
  return (
    <ul className="relative z-50 hidden gap-4 text-black sm:flex">
      {headerListItem.map((item) => (
        <HeaderListItem key={item.id} item={item} path={path} />
      ))}
    </ul>
  )
}
