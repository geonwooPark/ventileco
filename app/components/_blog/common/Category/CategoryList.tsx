import { categories } from '@/constants'
import React from 'react'
import CategoryItem from './CategoryItem'

interface CategoryListProps {
  paramsCategory?: string
}

export default function CategoryList({ paramsCategory }: CategoryListProps) {
  return (
    <ul className="mb-6 flex flex-wrap justify-center gap-2">
      {categories.map((category, i) => (
        <CategoryItem
          key={i}
          category={category}
          paramsCategory={paramsCategory}
        />
      ))}
    </ul>
  )
}
