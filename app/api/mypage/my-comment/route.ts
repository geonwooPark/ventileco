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
          $elemMatch: {
            'user.userId': userId,
          },
        },
      }),
      ReplyComment.find<CommentType>({
        user: {
          $elemMatch: {
            'user.userId': userId,
          },
        },
      }),
    ])

    const users = []
    for (const posting of myCommentedPost) {
      users.push(...posting.user)
    }
    for (const posting of myReplyCommentedPost) {
      users.push(...posting.user)
    }

    const result = users
      .filter((users) => users.user.userId === userId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
