import { Posting } from '@/models/posting'
import { connectMongo } from '../_utils/database'
import { GetListingsType, PostingType } from '../_interfaces/interface'

interface GetListingsParams {
  type: 'all' | 'category' | 'search'
  page: number
  limit: number
  category?: string
  search?: string
}

export default async function getListings({
  type,
  page,
  limit,
  category,
  search,
}: GetListingsParams): Promise<GetListingsType> {
  try {
    await connectMongo()
    let postings: PostingType[] = []
    let postingCount = 0

    switch (type) {
      case 'all':
        const AllPostings = await Posting.find<PostingType>({})
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const AllPostingsCount = await Posting.find<PostingType>(
          {},
        ).countDocuments()

        postings = AllPostings
        postingCount = AllPostingsCount
        break

      case 'category':
        const CategoryPostings = await Posting.find<PostingType>({
          category,
        })
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const CategoryPostingsCount = await Posting.find<PostingType>({
          category,
        }).countDocuments()

        postings = CategoryPostings
        postingCount = CategoryPostingsCount
        break

      case 'search':
        if (!search || search.trim() === '')
          return { postings: [], postingCount: 0 }

        const options = [
          { title: { $regex: new RegExp(search, 'i') } },
          { description: { $regex: new RegExp(search, 'i') } },
          { content: { $regex: new RegExp(search, 'i') } },
        ]
        const searchedPostings = await Posting.find<PostingType>({
          $or: options,
        })
          .sort({ createdAt: -1 })
          .skip((page - 1) * limit)
          .limit(limit)
        const searchedPostingsCount = await Posting.find<PostingType>({
          $or: options,
        }).countDocuments()

        postings = searchedPostings
        postingCount = searchedPostingsCount
        break
    }

    return { postings, postingCount }
  } catch (error) {
    return { postings: [], postingCount: 0 }
  }
}
