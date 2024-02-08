import { connectMongo } from '@/lib/database'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import { ReplyComment } from '../../../models/replyComment'
import { authOptions } from '@/lib/authOptions'

export async function POST(req: NextRequest) {
  const { postingId, commentId, text } = await req.json()
  const session = await getServerSession(authOptions)

  if (!text) {
    return NextResponse.json({ error: '댓글을 입력하세요!' }, { status: 409 })
  }

  try {
    await connectMongo()
    const comment = await ReplyComment.findOneAndUpdate(
      {
        postingId,
      },
      {
        $push: {
          user: {
            commentId,
            replyCommentId: uuid(),
            userImage: session?.user.image,
            userId: session?.user.id,
            userName: session?.user.name,
            createdAt: new Date(),
            text,
          },
        },
      },
      { new: true },
    )
    return NextResponse.json(comment.user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { postingId, commentId } = await req.json()

  try {
    await connectMongo()
    const comment = await ReplyComment.findOneAndUpdate(
      {
        postingId,
      },
      { $pull: { user: { replyCommentId: commentId } } },
      { new: true },
    )

    return NextResponse.json(comment.user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { postingId, commentId, text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: '댓글을 입력하세요!' }, { status: 406 })
  }

  try {
    await connectMongo()
    const comment = await ReplyComment.findOneAndUpdate(
      {
        postingId,
      },
      { $set: { 'user.$[elem].text': text } },
      { arrayFilters: [{ 'elem.replyCommentId': commentId }], new: true },
    )
    return NextResponse.json(comment.user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
