import { cache } from 'react'
import { PostingType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'
import { Posting } from '@/models/posting'

export default cache(async function getPopularListing() {
  try {
    await connectMongo()
    const posting = await Posting.find<PostingType>()
      .sort({ views: -1 })
      .limit(3)

    return posting
  } catch (error) {
    return []
  }
})
