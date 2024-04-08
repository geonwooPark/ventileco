import { useHotPlaceFilter } from '@/hooks/store/useHotPlaceFilterStore'
import Link from 'next/link'
import React from 'react'
import { LuFilter } from 'react-icons/lu'

interface WriteIconProps {
  path: string
}

export default function FilterIcon({ path }: WriteIconProps) {
  const { category, gu } = useHotPlaceFilter()

  return (
    <Link
      href={`${path}/filter` as any}
      className={`relative z-[100] cursor-pointer ${
        category || gu ? 'text-red-600' : 'text-brown-dark'
      }`}
    >
      <LuFilter size={22} />
    </Link>
  )
}
