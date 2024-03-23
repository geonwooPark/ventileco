import getRecommendedBook from '@/actions/_book/getRecommendedBook'
import React from 'react'
import BookListItem from '../_main/BookList/BookListItem'

export default async function RecommendedBookList() {
  const recommendedBooks = await getRecommendedBook()

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {recommendedBooks.map((book) => (
        <BookListItem key={book._id} book={book} />
      ))}
    </div>
  )
}
