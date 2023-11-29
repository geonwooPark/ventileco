import { cache } from 'react'
import { PostingType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'
import { Posting } from '@/models/posting'

export default cache(async function getPostingCount() {
  try {
    await connectMongo()
    const AllPostingsCount = await Posting.find<PostingType>(
      {},
    ).countDocuments()

    return AllPostingsCount
  } catch (error) {
    return 0
  }
})
