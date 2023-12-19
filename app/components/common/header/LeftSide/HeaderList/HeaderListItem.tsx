import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface HeaderListItemProps {
  item: {
    _id: number
    title: string
    link: string
  }
}

export default function HeaderListItem({ item }: HeaderListItemProps) {
  const pathName = usePathname()

  return (
    <li key={item._id} className="relative">
      <Link
        href={item.link as any}
        className={`text-sm font-light text-white duration-300 hover:opacity-70`}
      >
        {item.title}
      </Link>
      <span
        className={`absolute bottom-[-1px] left-0 h-[2px] w-full scale-0 bg-white duration-300 group-hover:scale-100 ${
          pathName.startsWith(item.link) && 'scale-100'
        }`}
      ></span>
    </li>
  )
}
