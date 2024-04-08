'use client'

import { BookReviewType } from '@/interfaces/interface'
import React, { useEffect, useState } from 'react'
import BookListItem from './BookListItem'
import { toast } from 'react-toastify'
import Spinner from '../../../common/Spinner'
import useIntersectionObserver from '@/hooks/useIntersectionObserver'

interface AddedBookListProps {
  category: string
}

export default function AddedBookList({ category }: AddedBookListProps) {
  const [addedBooks, setAddedBooks] = useState<BookReviewType[]>([])
  const { lastItem, isLoading, setIsLoading, triggerRef } =
    useIntersectionObserver(addedBooks)

  useEffect(() => {
    if (lastItem === 0) return

    const fetchData = async () => {
      setIsLoading(true)
      try {
        await fetch(`/api/book?category=${category}&lastItem=${lastItem}`)
          .then((res) => res.json())
          .then((result) => {
            if (result.length === 0) return
            setAddedBooks((prev) => [...prev, ...result])
          })
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData()
  }, [lastItem])

  return (
    <>
      {addedBooks.map((book) => (
        <BookListItem key={book._id} book={book} />
      ))}
      {isLoading && (
        <div className="fixed bottom-8 left-0 flex w-full justify-center">
          <Spinner width="w-6" height="h-6" />
        </div>
      )}
      <div ref={triggerRef} className="place-self-end"></div>
    </>
  )
}
