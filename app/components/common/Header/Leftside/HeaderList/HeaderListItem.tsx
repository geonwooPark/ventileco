import Link from 'next/link'
import React from 'react'

interface HeaderListItemProps {
  item: {
    id: number
    title: string
    link: string
  }
  path: string
}

export default function HeaderListItem({ item, path }: HeaderListItemProps) {
  return (
    <li className="relative text-sm">
      <Link href={item.link as any} className={`duration-300 hover:opacity-70`}>
        {item.title}
      </Link>
      <span
        className={`absolute bottom-[-2px] left-0 h-[2px] w-full scale-0 rounded-full bg-black duration-300 group-hover:scale-100 ${
          path.startsWith(item.link) && 'scale-100'
        }`}
      />
    </li>
  )
}
