import { CommentType } from '@/app/_interfaces/interface'
import { connectMongo } from '@/app/_utils/database'
import { Comment } from '@/models/comment'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  try {
    await connectMongo()
    const MyCommentList = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId: session?.user.id },
      },
    }).sort({ createdAt: -1 })

    const result: CommentType[] = MyCommentList.map((MyComment) => {
      const res = MyComment.user.filter(
        (elem) => elem.userId === session?.user.id,
      )
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
