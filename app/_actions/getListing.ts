import { Posting } from '@/models/posting'
import { connectMongo } from '../_utils/database'
import { GetListingType, PostingType } from '../_interfaces/interface'

interface GetListingParams {
  type: 'all' | 'category' | 'search'
  page: number
  limit: number
  category?: string
  search?: string
}

export default async function getListing({
  type,
  page,
  limit,
  category,
  search,
}: GetListingParams): Promise<GetListingType> {
  try {
    await connectMongo()
    let listing: PostingType[] = []
    let listingCount = 0

    switch (type) {
      case 'all':
        const AllListing = await Posting.find<PostingType>({})
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const AllListingCount = await Posting.find<PostingType>(
          {},
        ).countDocuments()

        listing = AllListing
        listingCount = AllListingCount
        break

      case 'category':
        const CategoryListing = await Posting.find<PostingType>({
          category,
        })
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const CategoryListingCount = await Posting.find<PostingType>({
          category,
        }).countDocuments()

        listing = CategoryListing
        listingCount = CategoryListingCount
        break

      case 'search':
        if (!search || search.trim() === '')
          return { listing: [], listingCount: 0 }

        const options = [
          { title: { $regex: new RegExp(search, 'i') } },
          { description: { $regex: new RegExp(search, 'i') } },
          { content: { $regex: new RegExp(search, 'i') } },
        ]
        const searchListing = await Posting.find<PostingType>({
          $or: options,
        })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
        const searchListingCount = await Posting.find<PostingType>({
          $or: options,
        }).countDocuments()

        listing = searchListing
        listingCount = searchListingCount
        break
    }

    return { listing, listingCount }
  } catch (error) {
    return { listing: [], listingCount: 0 }
  }
}
