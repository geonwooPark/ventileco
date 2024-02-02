import getAllBook from '@/actions/getAllBook'
import React from 'react'
import BookListItem from './BookListItem'
import AddedBookList from './AddedBookList'

interface BookListProps {
  category: string
}

export default async function BookList({ category }: BookListProps) {
  const books = await getAllBook(category)

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {books.map((book) => (
        <BookListItem key={book._id} book={book} />
      ))}
      <AddedBookList category={category} />
    </div>
  )
}
