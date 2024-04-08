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
  index: idx,
  path,
  page,
  category,
  search,
}: PageNumberProps) {
  return (
    <Link
      href={{
        pathname: category
          ? idx === 0
            ? `/blog/${path}/${category}`
            : `/blog/${path}/${category}/${idx + 1}`
          : search
            ? `/blog/${path}`
            : idx === 0
              ? '/blog'
              : `/blog/${path}/${idx + 1}`,
        query: search && { ...(search ? { search } : {}), page: idx + 1 },
      }}
      aria-label={`${idx + 1}페이지`}
    >
      <button
        type="button"
        className={`h-8 w-8 rounded-full ${
          page === idx + 1 ? 'bg-brown-normal ' : 'bg-transparent'
        }`}
        aria-label={`${idx + 1}페이지`}
      >
        {idx + 1}
      </button>
    </Link>
  )
}
