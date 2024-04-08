import Link from 'next/link'
import React from 'react'
import { AiOutlineLeft } from 'react-icons/ai'

interface PrevPageButtonProps {
  path: string
  page: number
  category?: string
  search?: string
}

export default function PrevPageButton({ ...props }: PrevPageButtonProps) {
  const { category, path, page, search } = props

  return (
    <Link
      href={{
        pathname: category
          ? page === 2
            ? `/blog/${path}/${category}`
            : `/blog/${path}/${category}/${page - 1}`
          : search
            ? `${path}`
            : page === 2
              ? '/blog'
              : `/blog/${path}/${page - 1}`,
        query: search && { ...(search ? { search } : {}), page: page - 1 },
      }}
      aria-label="뒤로 가기"
    >
      <button
        type="button"
        disabled={page === 1 ? true : false}
        className={`flex h-8 w-8 items-center justify-center disabled:text-brown-dark`}
        aria-label="뒤로 가기"
      >
        <AiOutlineLeft />
      </button>
    </Link>
  )
}
