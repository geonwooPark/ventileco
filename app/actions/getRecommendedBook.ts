import { cache } from 'react'
import { connectMongo } from '../lib/database'
import { Book } from '../../models/book'

export default cache(async function getRecommendedBook() {
  try {
    await connectMongo()
    const recommendedBooks = await Book.find({ recommended: true })

    return recommendedBooks
  } catch (error) {
    return null
  }
})
