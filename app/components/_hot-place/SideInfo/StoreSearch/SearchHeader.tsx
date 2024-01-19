import React from 'react'
import { IoRefresh } from 'react-icons/io5'

interface SearchHeaderProps {
  onReset: () => void
}

export default function SearchHeader({ onReset }: SearchHeaderProps) {
  return (
    <div className="flex h-[46px] items-center justify-between text-sm text-black">
      <p>검색결과</p>
      <IoRefresh size={20} className="cursor-pointer" onClick={onReset} />
    </div>
  )
}
