import { BookReviewType } from '@/interfaces/interface'
import Image from 'next/image'
import React from 'react'

interface BookListItemProps {
  book: BookReviewType
}

export default function BookListItem({ book }: BookListItemProps) {
  return (
    <div className="flex h-[320px] cursor-pointer flex-col items-center justify-center rounded-md bg-gray-100 transition duration-200 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative mx-auto mb-3 h-[200px] w-[160px] overflow-hidden rounded-[3px] border-b-[2px] border-black/20 shadow-xl after:absolute after:left-0 after:top-0 after:h-full after:w-full after:bg-gradient-to-r after:from-black/10 after:from-0% after:via-white/30 after:via-5% after:to-white/10 after:to-90%">
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
  )
}
