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
    <div>
      <Link href={{ pathname: `/categories/${category}` }}>
        <button
          className={`w-full rounded-md px-3 py-2 text-sm text-gray-700 bg-gray-100 transition hover:opacity-50
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
    </div>
  )
}
