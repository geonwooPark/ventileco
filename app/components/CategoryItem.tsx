'use client'

import Link from 'next/link'
import React from 'react'

export default function CategoryItem({ category }: { category: string }) {
  return (
    <div>
      <Link href={`/categories/${category}`}>
        <button className="px-3 py-2 text-sm text-gray-700 bg-gray-100 rounded-sm transition hover:bg-gray-200">
          {category}
        </button>
      </Link>
    </div>
  )
}
