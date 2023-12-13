import Link from 'next/link'
import React from 'react'
import { AiOutlineRight } from 'react-icons/ai'

interface NextPageButtonProps {
  path: string
  page: number
  lastPageNum: number
  category?: string
  search?: string
}

export default function NextPageButton({
  lastPageNum,
  ...props
}: NextPageButtonProps) {
  const { category, path, page, search } = props

  return (
    <Link
      href={{
        pathname: category
          ? `/blog/${path}/${category}/${page + 1}`
          : search
          ? `/blog/${path}`
          : `/blog/${path}/${page + 1}`,
        query: search && { ...(search ? { search } : {}), page: page + 1 },
      }}
      aria-label="앞으로 가기"
    >
      <button
        type="button"
        disabled={page === lastPageNum ? true : false}
        className={`flex justify-center items-center w-8 h-8 disabled:text-gray-300`}
        aria-label="앞으로 가기"
      >
        <AiOutlineRight />
      </button>
    </Link>
  )
}
