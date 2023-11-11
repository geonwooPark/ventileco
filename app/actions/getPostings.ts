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

export default async function getPostings({
  page = 1,
  limit = 10,
}: {
  page: number
  limit: number
}) {
  try {
    await connectMongo()
    let postings = await Posting.find<PostingType>({})
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)

    let postingCount = await Posting.countDocuments()

    return { postings, postingCount }
  } catch (error) {
    return { postings: null, postingCount: 0 }
  }
}
