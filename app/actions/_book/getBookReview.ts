import { connectMongo } from '../../lib/database'
import { cache } from 'react'
import { Book } from '../../../models/book'
import { BookReviewType } from '@/interfaces/interface'

export default cache(async function getBookReview(id: string) {
  try {
    await connectMongo()

    const review = await Book.findOne<BookReviewType>({ _id: id })

    return review
  } catch (error) {
    return null
  }
})
