import { CommentType } from '@/app/_interfaces/interface'
import { connectMongo } from '@/app/_utils/database'
import { Comment } from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()
    const MyCommentList = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId },
      },
    }).sort({ createdAt: -1 })

    const result: CommentType[] = MyCommentList.map((MyComment) => {
      const res = MyComment.user.filter((elem) => elem.userId === userId)
      return { ...MyComment._doc, user: res }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
