import { Comment } from '@/models/comment'
import { CommentType } from '../_interfaces/interface'
import { connectMongo } from '../_utils/database'

export default async function getComments(postingId: string) {
  try {
    await connectMongo()
    const comment = await Comment.findOne<CommentType>({ postingId })

    if (comment) {
      return comment.user
    } else {
      return []
    }
  } catch (error) {
    return []
  }
}
