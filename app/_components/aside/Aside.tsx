import { categories } from '@/app/_utils/categoryArr'
import React from 'react'
import CategoryItem from './CategoryItem'

export default function Aside() {
  return (
    <aside className="min-w-[120px] mb-10 md:mb-0">
      <h3 className="md:text-lg mb-4">카테고리</h3>
      <ul className="flex flex-wrap md:flex-col gap-2">
        {categories.map((category, i) => {
          return <CategoryItem key={i} category={category} />
        })}
      </ul>
    </aside>
  )
}
