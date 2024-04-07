'use client'

import { useHotPlaceFilter } from '@/hooks/store/useHotPlaceFilterStore'
import Link from 'next/link'
import React from 'react'
import { LuFilter } from 'react-icons/lu'

export default function FilterButton() {
  const { category, gu } = useHotPlaceFilter()

  return (
    <Link
      href={'/hot-place/filter'}
      className={`flex items-center gap-1 rounded-md p-3 shadow-sm duration-200 ${
        category || gu ? 'bg-gray-700 text-red-500' : 'bg-blue-600 text-white'
      }`}
    >
      <span className="text-sm">
        <LuFilter size={20} />
      </span>
    </Link>
  )
}
