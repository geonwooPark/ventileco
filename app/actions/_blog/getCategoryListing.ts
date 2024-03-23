import { Posting } from '../../../models/posting'
import { connectMongo } from '../../lib/database'
import { PostingType } from '../../interfaces/interface'
import { cache } from 'react'

interface GetListingParams {
  page: number
  limit: number
  category: string
}

export default cache(async function getCategoryListing({
  page,
  limit,
  category,
}: GetListingParams): Promise<PostingType[]> {
  try {
    await connectMongo()
    const listing = await Posting.find<PostingType>({
      category,
    })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)

    return listing
  } catch (error) {
    return []
  }
})
