import { connectMongo } from '../lib/database'
import { cache } from 'react'
import { Book } from '../../models/book'
import { BookReviewType } from '@/interfaces/interface'
import { BOOKLIMIT } from '@/constants'

export default cache(async function getCategoryBook(category: string) {
  try {
    await connectMongo()

    const books = await Book.find<BookReviewType>(
      category === '전체' ? {} : { category },
    ).limit(BOOKLIMIT)

    return books
  } catch (error) {
    return []
  }
})
