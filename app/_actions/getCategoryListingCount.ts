import { cache } from 'react'
import { PostingType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'
import { Posting } from '@/models/posting'

export default cache(async function getCategoryListingCount(category: string) {
  try {
    await connectMongo()
    const categoryListingCount = await Posting.find<PostingType>({
      category,
    }).countDocuments()

    return categoryListingCount
  } catch (error) {
    return 0
  }
})
