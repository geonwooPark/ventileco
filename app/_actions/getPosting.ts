import { cache } from 'react'
import { PostingType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'
import { Posting } from '@/models/posting'

export const revalidate = 0

export default cache(async function getPosting(postingId: string) {
  try {
    await connectMongo()
    const posting = await Posting.findOne<PostingType>({ _id: postingId })

    return posting
  } catch (error) {
    return null
  }
})
