import { HotPlaceListing } from '@/interfaces/interface'
import React from 'react'

interface AutomaticSearchListProps {
  automaticSearchList: HotPlaceListing[]
  onClick: (store: string) => void
}

export default function AutomaticSearchList({
  automaticSearchList,
  onClick,
}: AutomaticSearchListProps) {
  return (
    <ul>
      {automaticSearchList.map((listItem, i) => (
        <li
          key={i}
          onClick={() => onClick(listItem.store)}
          className="cursor-pointer border-b px-3 py-2 text-sm last:border-none"
        >
          {listItem.store}
        </li>
      ))}
    </ul>
  )
}
