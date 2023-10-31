import { Posting } from '@/models/posting'
import { connectMongo } from './database'

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

export default async function getPostings() {
  try {
    await connectMongo()
    let postings = await Posting.find<PostingType>({}).sort({
      createdAt: -1,
    })
    // postings = postings.map((posting) => {
    //   return { ...posting, _id: posting._id.toString() }
    // })
    return postings
  } catch (error) {
    return null
  }
}
