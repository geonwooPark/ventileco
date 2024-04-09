'use client'

import { BookReviewType } from '@/interfaces/interface'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface RecommendedBookItemProps {
  recommendedBook: BookReviewType
}

export default function RecommendedBookItem({
  recommendedBook,
}: RecommendedBookItemProps) {
  const router = useRouter()

  return (
    <div
      onClick={() => router.push(`/book/detail/${recommendedBook._id}`)}
      className="card-shadowed group h-full w-[280px] shrink-0 rounded-md px-4 py-3"
    >
      <div className="book-cover relative mx-auto mb-3 w-full">
        <Image
          src={recommendedBook.thumbnail}
          alt={recommendedBook.title}
          fill
          objectFit="fill"
          className="block-drag"
        />
      </div>
      <div className="flex select-none flex-col justify-between">
        <p className="text-sm text-beige-dark">{recommendedBook.category}</p>
        <h3 className="mb-3 truncate text-lg text-brown-dark">
          {recommendedBook.title.length <= 24
            ? recommendedBook.title
            : recommendedBook.title.slice(0, 24) + '...'}
        </h3>
        <p className="text-xs text-beige-dark">
          {recommendedBook.authors.length === 1
            ? recommendedBook.authors[0]
            : `${recommendedBook.authors[0]} 외 ${
                recommendedBook.authors.length - 1
              } 명`}
        </p>
      </div>
    </div>
  )
}
