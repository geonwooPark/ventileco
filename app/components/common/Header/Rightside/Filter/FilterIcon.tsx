import { useHotPlaceFilter } from '@/hooks/store/useHotPlaceFilterStore'
import Link from 'next/link'
import React from 'react'
import { IconFilter } from '../../../../../../public/svgs/icons'

interface WriteIconProps {
  path: string
}

export default function FilterIcon({ path }: WriteIconProps) {
  const { category, gu } = useHotPlaceFilter()

  return (
    <Link
      href={`${path}/filter` as any}
      className={`relative z-[100] size-5 cursor-pointer ${
        category || gu ? 'text-red-600' : 'text-brown-dark'
      }`}
    >
      <IconFilter />
    </Link>
  )
}
