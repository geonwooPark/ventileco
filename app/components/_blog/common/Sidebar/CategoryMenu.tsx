import React from 'react'
import CategoryItem from './CategoryItem'
import { categories } from '@/app/constants'

interface CategoryMenuProps {
  paramsCategory?: string
}

export default function CategoryMenu({ paramsCategory }: CategoryMenuProps) {
  return (
    <aside className="mb-10 min-w-[120px] md:mb-0">
      <h2 className="mb-4 md:text-lg">카테고리</h2>
      <ul className="flex flex-wrap gap-2 md:flex-col">
        {categories.map((category, i) => {
          return (
            <CategoryItem
              key={i}
              category={category}
              paramsCategory={paramsCategory}
            />
          )
        })}
      </ul>
    </aside>
  )
}
