import { cache } from 'react'
import { PostingType } from '../../interfaces/interface'
import { connectMongo } from '../../lib/database'
import { Posting } from '../../../models/posting'

export default cache(async function getPosting(postingId: string) {
  try {
    await connectMongo()
    const posting = await Posting.findOne<PostingType>({ _id: postingId })

    return posting
  } catch (error) {
    return null
  }
})
