import { headerListItem } from '@/constants'
import React from 'react'
import HeaderListItemSmallDevice from './HeaderListItemSmallDevice'

interface HeaderListSmallDeviceProps {
  showMenu: boolean
  path: string
}

export default function HeaderListSmallDevice({
  showMenu,
  path,
}: HeaderListSmallDeviceProps) {
  return (
    <div
      className={`absolute left-0 top-[56px] z-[99] h-[calc(100vh-56px)] w-[50%] transition sm:hidden
        ${
          showMenu ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
        }
`}
    >
      <ul className="h-full bg-beige-light text-center shadow-xl">
        {headerListItem.map((item) => (
          <HeaderListItemSmallDevice key={item.id} item={item} path={path} />
        ))}
      </ul>
    </div>
  )
}
