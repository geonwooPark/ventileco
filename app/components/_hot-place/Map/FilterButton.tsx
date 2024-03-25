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
      className={`flex items-center gap-1 rounded-md bg-white p-3 shadow-sm duration-200 ${
        category || gu ? 'text-blue-600' : 'text-gray-700'
      }`}
    >
      <span className="text-sm">
        <LuFilter size={20} />
      </span>
    </Link>
  )
}
