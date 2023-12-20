import { categories } from '@/app/constants'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoryListProps {
  paramsCategory?: string
}

export default function CategoryList({ paramsCategory }: CategoryListProps) {
  return (
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
  )
}
