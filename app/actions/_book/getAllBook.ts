import { connectMongo } from '../../lib/database'
import { cache } from 'react'
import { Book } from '../../../models/book'
import { BookReviewType } from '@/interfaces/interface'

export default cache(async function getAllBook() {
  try {
    await connectMongo()

    const books = await Book.find<BookReviewType>({})

    return books
  } catch (error) {
    return []
  }
})
