import { Comment } from '@/models/comment'
import { connectMongo } from './database'

export interface CommentType {
  _doc?: any
  _id: string
  postingId: string
  title: string
  user: {
    commentId: string
    userImage: string
    userId: string
    userName: string
    createdAt: Date
    text: string
  }[]
  createdAt: Date
  updatedAt: Date
}

export default async function getComments(postingId: string) {
  try {
    await connectMongo()
    const comment = await Comment.findOne<CommentType>({ postingId })
    if (!comment) return null
    return comment.user
  } catch (error) {
    return null
  }
}
