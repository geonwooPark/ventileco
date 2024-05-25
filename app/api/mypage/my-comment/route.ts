import { CommentType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { Comment } from '../../../../models/comment'
import { NextRequest, NextResponse } from 'next/server'
import { ReplyComment } from '../../../../models/replyComment'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()
    const [myCommentedPost, myReplyCommentedPost] = await Promise.all([
      Comment.find<CommentType>({
        user: {
          $elemMatch: { userId },
        },
      }),
      ReplyComment.find<CommentType>({
        user: {
          $elemMatch: { userId },
        },
      }),
    ])

    const myComment = []
    for (const posting of myCommentedPost) {
      for (const elem of posting.user) {
        if (elem.userId === userId) {
          myComment.push({
            title: posting.title,
            postingId: posting.postingId,
            path: posting.path,
            ...elem,
          })
        }
      }
    }
    for (const posting of myReplyCommentedPost) {
      for (const elem of posting.user) {
        if (elem.userId === userId) {
          myComment.push({
            title: posting.title,
            postingId: posting.postingId,
            path: posting.path,
            ...elem,
          })
        }
      }
    }

    myComment.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return NextResponse.json(myComment, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
