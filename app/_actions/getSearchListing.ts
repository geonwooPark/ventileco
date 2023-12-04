import { Posting } from '@/models/posting'
import { connectMongo } from '../_utils/database'
import { GetListingType, PostingType } from '../_interfaces/interface'

interface GetListingParams {
  page: number
  limit: number
  search: string
}

export default async function getSearchListing({
  page,
  limit,
  search,
}: GetListingParams): Promise<GetListingType> {
  try {
    await connectMongo()
    if (!search || search.trim() === '') return { listing: [], listingCount: 0 }

    const options = [
      { title: { $regex: new RegExp(search, 'i') } },
      { description: { $regex: new RegExp(search, 'i') } },
      { content: { $regex: new RegExp(search, 'i') } },
    ]
    const listing = await Posting.find<PostingType>({
      $or: options,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
    const listingCount = await Posting.find<PostingType>({
      $or: options,
    }).countDocuments()

    return { listing, listingCount }
  } catch (error) {
    return { listing: [], listingCount: 0 }
  }
}
