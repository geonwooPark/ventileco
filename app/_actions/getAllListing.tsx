import { Posting } from '@/models/posting'
import { connectMongo } from '../_utils/database'
import { PostingType } from '../_interfaces/interface'
import { cache } from 'react'

interface GetListingParams {
  page: number
  limit: number
}

export default cache(async function getAllListing({
  page,
  limit,
}: GetListingParams): Promise<PostingType[]> {
  try {
    await connectMongo()

    const listing = await Posting.find<PostingType>({})
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
