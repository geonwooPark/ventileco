import { Posting } from '@/models/posting'
import { connectMongo } from '../_utils/database'
import { GetListingType, PostingType } from '../_interfaces/interface'

interface GetListingParams {
  page: number
  limit: number
}

export default async function getAllListing({
  page,
  limit,
}: GetListingParams): Promise<GetListingType> {
  try {
    await connectMongo()

    const listing = await Posting.find<PostingType>({})
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)
    const listingCount = await Posting.find<PostingType>({}).countDocuments()

    return { listing, listingCount }
  } catch (error) {
    return { listing: [], listingCount: 0 }
  }
}
