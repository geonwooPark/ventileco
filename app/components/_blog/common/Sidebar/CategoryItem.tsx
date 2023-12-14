import Link from 'next/link'
import React from 'react'

interface CategoryItemProps {
  category: string
  paramsCategory?: string
}

export default function CategoryItem({
  category,
  paramsCategory,
}: CategoryItemProps) {
  return (
    <li>
      <Link href={{ pathname: `/blog/categories/${category}` }}>
        <button
          className={`w-full rounded-md bg-gray-100 px-3 py-2 text-sm text-gray-700 transition hover:opacity-50
          ${
            paramsCategory && decodeURI(paramsCategory) === category
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100'
          }
        `}
        >
          {category}
        </button>
      </Link>
    </li>
  )
}
