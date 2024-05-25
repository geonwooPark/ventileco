import { CommentType, UniquePostType } from '@/interfaces/interface'
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

    const posts = [...myCommentedPost, ...myReplyCommentedPost]

    const postsObj: Record<string, UniquePostType> = {}
    for (const post of posts) {
      if (!postsObj[post.path]) {
        postsObj[post.path] = {
          _id: post._id,
          title: post.title,
          path: post.path,
          userLength: post.user.length,
          createdAt: post.createdAt,
        }
      } else {
        postsObj[post.path].userLength += post.user.length
      }
    }

    const result = Object.values(postsObj).sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )

    return NextResponse.json(result, {
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
