import { bookCategory } from '@/constants'
import Link from 'next/link'
import React from 'react'

interface BookCategoryFilterProps {
  category?: string
}

export default function BookCategoryFilter({
  category,
}: BookCategoryFilterProps) {
  return (
    <div className="hide-scroll mb-6 flex justify-center gap-2 overflow-y-hidden overflow-x-scroll text-sm text-gray-700">
      {[{ id: 0, category: '전체' }, ...bookCategory].map((categoryItem) => (
        <Link
          key={categoryItem.id}
          href={`/book?category=${categoryItem.category}`}
          className="shrink-0"
        >
          <div
            className={`block rounded-md bg-beige-light px-2.5 py-2 transition duration-200 ${
              categoryItem.category === category
                ? 'text-active'
                : 'text-brown-dark'
            }`}
          >
            {categoryItem.category}
          </div>
        </Link>
      ))}
    </div>
  )
}
