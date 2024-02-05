import { BookReviewType } from '@/interfaces/interface'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface BookListItemProps {
  book: BookReviewType
}

export default function BookListItem({ book }: BookListItemProps) {
  return (
    <Link
      href={`/book/detail/${book._id}`}
      className={`${
        book.recommended && 'recommended-badge'
      } relative h-[320px] cursor-pointer transition duration-200 hover:-translate-y-2 hover:shadow-xl`}
    >
      <div className="relative flex h-full w-full flex-col items-center justify-center rounded-md bg-gray-100">
        <div className="book-cover relative mx-auto mb-3">
          <Image src={book.thumbnail} alt={book.title} fill objectFit="fill" />
        </div>
        <div className="text-center">
          <p className="mb-1 text-sm font-medium">
            {book.title.length <= 23
              ? book.title
              : book.title.slice(0, 23) + '...'}
          </p>
          <p className="text-xs">
            {book.authors.length === 1
              ? book.authors[0]
              : `${book.authors[0]} 외 ${book.authors.length - 1} 명`}
          </p>
        </div>
      </div>
    </Link>
  )
}
