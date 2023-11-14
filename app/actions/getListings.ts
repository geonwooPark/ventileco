import { Posting } from '@/models/posting'
import { connectMongo } from '../utils/database'
import { GetListingsType, PostingType } from '../interfaces/interface'

interface GetListingsParams {
  type: 'all' | 'category' | 'search'
  search?: string
  page: number
  limit: number
}

export default async function getListings({
  type,
  search,
  page = 1,
  limit = 10,
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
          category: search,
        })
          .sort({
            createdAt: -1,
          })
          .skip((page - 1) * limit)
          .limit(limit)
        const CategoryPostingsCount = await Posting.find<PostingType>({
          category: search,
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
