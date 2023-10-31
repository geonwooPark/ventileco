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

export default async function getPosting(id: string) {
  try {
    await connectMongo()
    let posting = await Posting.findOne<PostingType>({ _id: id })
    // postings = postings.map((posting) => {
    //   return { ...posting, _id: posting._id.toString() }
    // })
    return posting
  } catch (error) {
    return null
  }
}
