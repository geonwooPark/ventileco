import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

interface HeaderListItemProps {
  item: {
    id: number
    title: string
    link: string
  }
}

export default function HeaderListItem({ item }: HeaderListItemProps) {
  const pathName = usePathname()

  return (
    <li key={item.id} className="relative">
      <Link
        href={item.link as any}
        className={`text-sm font-light duration-300 hover:opacity-70`}
      >
        {item.title}
      </Link>
      <span
        className={`absolute bottom-[-1px] left-0 h-[2px] w-full scale-0 bg-black duration-300 group-hover:scale-100 ${
          pathName.startsWith(item.link) && 'scale-100'
        }`}
      ></span>
    </li>
  )
}
