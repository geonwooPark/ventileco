import { cache } from 'react'
import { connectMongo } from '../../lib/database'
import { Book } from '../../../models/book'
import { BookReviewType } from '@/interfaces/interface'

export default cache(async function getRecommendedBook() {
  try {
    await connectMongo()
    const recommendedBooks = await Book.find<BookReviewType>({
      recommended: true,
    })

    return recommendedBooks
  } catch (error) {
    return []
  }
})
