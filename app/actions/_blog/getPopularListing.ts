import { cache } from 'react'
import { PostingType } from '../../interfaces/interface'
import { connectMongo } from '../../lib/database'
import { Posting } from '../../../models/posting'

export default cache(async function getPopularListing() {
  try {
    await connectMongo()
    const posting = await Posting.find<PostingType>()
      .sort({ views: -1 })
      .limit(5)

    return posting
  } catch (error) {
    return []
  }
})
