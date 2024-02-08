import { CommentType, ReplyCommentType } from '@/interfaces/interface'
import { Comment } from '../../models/comment'
import { ReplyComment } from '../../models/replyComment'
import { connectMongo } from '@/lib/database'
import { cache } from 'react'

export default cache(async function getAllComment(postingId: string) {
  try {
    await connectMongo()

    const comments = await Comment.findOne<CommentType>({ postingId })
    const replyComments = await ReplyComment.findOne<ReplyCommentType>({
      postingId,
    })
    if (!comments) return { comments: [], replyComments: [] }
    if (!replyComments) return { comments: comments.user, replyComments: [] }

    return { comments: comments.user, replyComments: replyComments.user }
  } catch (error) {
    return { comments: [], replyComments: [] }
  }
})
