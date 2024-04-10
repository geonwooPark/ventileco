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
      <ul className="card-shadowed h-full !rounded-l-none text-center">
        {headerListItem.map((item) => (
          <HeaderListItemSmallDevice key={item.id} item={item} path={path} />
        ))}
      </ul>
    </div>
  )
}
