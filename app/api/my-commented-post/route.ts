import { CommentType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { Comment } from '../../../models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()
    const myCommentedPost = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId },
      },
    }).sort({ createdAt: -1 })

    return NextResponse.json(myCommentedPost, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
