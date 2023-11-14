import Link from 'next/link'
import React from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'
import getChunk from '../utils/getChunk'

interface PagenationProps {
  path: string
  postingCount: number
  page: number
  limit: number
  search?: string
}

export default function Pagenation({
  path,
  postingCount,
  page,
  limit,
  search,
}: PagenationProps) {
  const lastPageNum = Math.ceil(postingCount / limit)
  const numbering = Array.from({ length: lastPageNum }, (_, i) => (
    <Link
      key={i}
      href={{
        pathname: `/${path}`,
        query: { ...(search ? { search } : {}), page: i + 1 },
      }}
    >
      <button
        type="button"
        className={`w-8 h-8 rounded-full ${
          page === i + 1 ? 'bg-gray-700 text-white' : 'bg-none'
        }`}
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
          pathname: `/${path}`,
          query: { ...(search ? { search } : {}), page: page - 1 },
        }}
      >
        <button
          type="button"
          disabled={page === 1 || postingCount === 0 ? true : false}
          className={`flex justify-center items-center w-8 h-8 disabled:text-gray-300`}
        >
          <AiOutlineLeft />
        </button>
      </Link>
      {boundNumbering[sequence]}
      <Link
        href={{
          pathname: `/${path}`,
          query: { ...(search ? { search } : {}), page: page + 1 },
        }}
      >
        <button
          disabled={page === lastPageNum || postingCount === 0 ? true : false}
          className={`flex justify-center items-center w-8 h-8 disabled:text-gray-300`}
        >
          <AiOutlineRight />
        </button>
      </Link>
    </div>
  )
}
