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
          className={`w-full rounded-md bg-beige-light px-2.5 py-2 text-sm transition hover:opacity-50
          ${
            paramsCategory && decodeURI(paramsCategory) === category
              ? 'text-active'
              : 'text-brown-dark'
          }
        `}
        >
          {category}
        </button>
      </Link>
    </li>
  )
}
