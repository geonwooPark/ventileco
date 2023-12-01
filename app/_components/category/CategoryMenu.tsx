import { categories } from '@/app/_utils/categoryArr'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoryMenuProps {
  paramsCategory?: string
}

export default function CategoryMenu({ paramsCategory }: CategoryMenuProps) {
  return (
    <aside className="min-w-[120px] mb-10 md:mb-0">
      <h3 className="mb-4 md:text-lg">카테고리</h3>
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
