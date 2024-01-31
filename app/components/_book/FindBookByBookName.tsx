import React, { useEffect, useState } from 'react'
import { UseFormClearErrors, UseFormSetValue } from 'react-hook-form'
import { BookReviewFormType } from './BookReviewForm'

interface FindBookByBookNameProps {
  setValue: UseFormSetValue<BookReviewFormType>
  keyword: string
  clearErrors: UseFormClearErrors<BookReviewFormType>
}

export default function FindBookByBookName({
  setValue,
  keyword,
  clearErrors,
}: FindBookByBookNameProps) {
  const [bookList, setBookList] = useState<any>([])
  const [showBookList, setShowBookList] = useState(false)

  const onClick = (
    title: string,
    description: string,
    authors: string[],
    thumbnail: string,
  ) => {
    clearErrors('title')
    setValue('title', title)
    setValue('description', description)
    setValue('authors', authors)
    setValue('thumbnail', thumbnail)
    setShowBookList(false)
  }

  useEffect(() => {
    if (!keyword) return

    const getAddress = async () => {
      await fetch(
        `https://dapi.kakao.com/v3/search/book.json?query=${keyword}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_API_KEY}`,
          },
        },
      )
        .then((res) => res.json())
        .then((result) => {
          setBookList(result.documents)
          setShowBookList(true)
        })
    }
    const timer = setTimeout(() => getAddress(), 300)

    return () => clearTimeout(timer)
  }, [keyword])

  return (
    keyword.length !== 0 &&
    bookList.length !== 0 &&
    showBookList && (
      <div className="absolute z-[200] w-full cursor-pointer rounded-md border bg-white">
        <ul className="max-h-[220px] overflow-scroll">
          {bookList.map((book: any, i: number) => (
            <li
              key={i}
              className="border-b px-2 py-1 last:border-none"
              onClick={() =>
                onClick(book.title, book.contents, book.authors, book.thumbnail)
              }
            >
              <div className="mb-1 text-sm text-gray-700">{book.title}</div>
              <div className="px-2 text-xs text-gray-400">
                {book.authors.length === 1
                  ? book.authors[0]
                  : `${book.authors[0]} 외 ${book.authors.length - 1} 명`}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
