import Link from 'next/link'
import React from 'react'

interface HeaderListItemSmallDeviceProps {
  item: {
    id: number
    title: string
    link: string
  }
  path: string
}

export default function HeaderListItemSmallDevice({
  item,
  path,
}: HeaderListItemSmallDeviceProps) {
  return (
    <li className="relative">
      <Link
        href={item.link as any}
        className="block py-4 duration-300 hover:opacity-70"
      >
        {item.title}
      </Link>
      <span
        className={`absolute bottom-[-1px] left-[50%] h-[2px] w-[40%] translate-x-[-50%] scale-0 rounded-full bg-brown-dark duration-300 group-hover:scale-100 ${
          path.startsWith(item.link) && 'scale-100'
        }`}
      />
    </li>
  )
}
