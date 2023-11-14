import getCurrentUser from '@/app/actions/getCurrentUser'
import { CommentType } from '@/app/interfaces/interface'
import { connectMongo } from '@/app/utils/database'
import { Comment } from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser()

  try {
    await connectMongo()
    const comments = await Comment.find<CommentType>({
      user: {
        $elemMatch: { userId: currentUser._id },
      },
    }).sort({ createdAt: -1 })

    const result = comments.map((comment) => {
      const res = comment.user.filter((elem) => elem.userId === currentUser._id)
      return { ...comment._doc, user: res }
    })

    return NextResponse.json(result, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
