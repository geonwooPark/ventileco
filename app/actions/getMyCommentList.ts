import { Comment } from '@/models/comment'
import { CommentType } from '../interfaces/interface'
import { connectMongo } from '../utils/database'
import getCurrentUser from './getCurrentUser'

export default async function getMyCommentList() {
  const currentUser = await getCurrentUser()

  try {
    await connectMongo()
    const comments = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId: currentUser._id },
      },
    }).sort({ createdAt: -1 })

    const result: CommentType[] = comments.map((comment) => {
      const res = comment.user.filter((elem) => elem.userId === currentUser._id)
      return { ...comment._doc, user: res }
    })

    return result
  } catch (error) {
    return []
  }
}
