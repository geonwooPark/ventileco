import { CommentType } from '@/app/_interfaces/interface'
import { connectMongo } from '@/app/_utils/database'
import { Comment } from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()
    let myCommentedPost = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId },
      },
    })

    let myComment = []
    for (const posting of myCommentedPost) {
      for (const elem of posting.user) {
        if (elem.userId === userId) {
          myComment.push({
            title: posting.title,
            postingId: posting.postingId,
            ...elem,
          })
        }
      }
    }

    return NextResponse.json(myComment, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
