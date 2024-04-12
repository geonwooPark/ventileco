import React from 'react'
import { IconRefresh } from '../../../../../../../public/svgs/icons'

interface SearchHeaderProps {
  onReset: () => void
}

export default function SearchHeader({ onReset }: SearchHeaderProps) {
  return (
    <div className="flex h-[46px] items-center justify-between text-beige-normal">
      <p className="font-point">Search results</p>
      <IconRefresh className="size-5 cursor-pointer" onClick={onReset} />
    </div>
  )
}
