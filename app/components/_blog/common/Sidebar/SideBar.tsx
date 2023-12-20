import React from 'react'
import CategoryList from './CategoryList'

interface SideBarProps {
  paramsCategory?: string
}

export default function SideBar({ paramsCategory }: SideBarProps) {
  return (
    <aside className="mb-10 min-w-[120px] md:mb-0">
      <h2 className="mb-4 md:text-lg">카테고리</h2>
      <CategoryList paramsCategory={paramsCategory} />
    </aside>
  )
}
