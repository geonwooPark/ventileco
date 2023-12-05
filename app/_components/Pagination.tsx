import Link from 'next/link'
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import getChunk from '../_utils/getChunk'

interface PaginationProps {
  path: string
  listingCount: number
  page: number
  limit: number
  category?: string
  search?: string
}

export default function Pagenation({
  path,
  listingCount,
  page,
  limit,
  category,
  search,
}: PaginationProps) {
  const lastPageNum = Math.ceil(listingCount / limit)
  const numbering = Array.from({ length: lastPageNum }, (_, i) => (
    <Link
      key={i}
      href={{
        pathname: category
          ? i === 0
            ? `/${path}/${category}`
            : `/${path}/${category}/${i + 1}`
          : search
          ? `${path}`
          : i === 0
          ? '/'
          : `/${path}/${i + 1}`,
        query: search && { ...(search ? { search } : {}), page: i + 1 },
      }}
      aria-label="페이지 이동"
    >
      <button
        type="button"
        className={`w-8 h-8 rounded-full ${
          page === i + 1 ? 'bg-gray-700 text-white' : 'bg-none'
        }`}
        aria-label="페이지 이동"
      >
        {i + 1}
      </button>
    </Link>
  ))

  const THE_NUMBER = 3
  const boundNumbering = getChunk(numbering, THE_NUMBER)
  const sequence = Math.floor((page - 1) / THE_NUMBER)

  return (
    <div className="flex items-center gap-2 text-sm">
      <Link
        href={{
          pathname: category
            ? page === 2
              ? `/${path}/${category}`
              : `/${path}/${category}/${page - 1}`
            : search
            ? `${path}`
            : page === 2
            ? '/'
            : `/${path}/${page - 1}`,
          query: search && { ...(search ? { search } : {}), page: page - 1 },
        }}
        aria-label="뒤로 가기"
      >
        <button
          type="button"
          disabled={page === 1 || listingCount === 0 ? true : false}
          className={`flex justify-center items-center w-8 h-8 disabled:text-gray-300`}
          aria-label="뒤로 가기"
        >
          <AiOutlineLeft />
        </button>
      </Link>

      {boundNumbering[sequence]}

      <Link
        href={{
          pathname: category
            ? `/${path}/${category}/${page + 1}`
            : search
            ? `${path}`
            : `/${path}/${page + 1}`,
          query: search && { ...(search ? { search } : {}), page: page + 1 },
        }}
        aria-label="앞으로 가기"
      >
        <button
          type="button"
          disabled={page === lastPageNum || listingCount === 0 ? true : false}
          className={`flex justify-center items-center w-8 h-8 disabled:text-gray-300`}
          aria-label="앞으로 가기"
        >
          <AiOutlineRight />
        </button>
      </Link>
    </div>
  )
}
