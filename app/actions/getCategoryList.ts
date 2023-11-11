import { Posting } from '@/models/posting'
import { connectMongo } from '../utils/database'

export interface PostingType {
  _id: string
  category: string
  title: string
  description: string
  thumbnailURL: string
  content: string
  createdAt: Date
  updatedAt: Date
}

export default async function getCategoryList({
  search,
  page = 1,
  limit = 10,
}: {
  search: string
  page: number
  limit: number
}) {
  try {
    await connectMongo()
    let postings = await Posting.find<PostingType>({ category: search })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)

    let postingCount = await Posting.find<PostingType>({
      category: search,
    }).countDocuments()

    return { postings, postingCount }
  } catch (error) {
    return { postings: null, postingCount: 0 }
  }
}
