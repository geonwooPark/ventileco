import Link from 'next/link'
import React from 'react'

interface PageNumberProps {
  index: number
  path: string
  page: number
  category?: string
  search?: string
}

export default function PageNumber({
  index: i,
  path,
  page,
  category,
  search,
}: PageNumberProps) {
  return (
    <Link
      href={{
        pathname: category
          ? i === 0
            ? `/blog/${path}/${category}`
            : `/blog/${path}/${category}/${i + 1}`
          : search
            ? `/blog/${path}`
            : i === 0
              ? '/blog'
              : `/blog/${path}/${i + 1}`,
        query: search && { ...(search ? { search } : {}), page: i + 1 },
      }}
      aria-label={`${i + 1}페이지`}
    >
      <button
        type="button"
        className={`h-8 w-8 rounded-full ${
          page === i + 1 ? 'bg-gray-700 text-white' : 'bg-none'
        }`}
        aria-label={`${i + 1}페이지`}
      >
        {i + 1}
      </button>
    </Link>
  )
}
