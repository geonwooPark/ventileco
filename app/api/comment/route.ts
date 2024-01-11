import { CommentType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { Comment } from '../../../models/comment'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    const comment = await Comment.findOne<CommentType>({ postingId })

    return NextResponse.json(comment?.user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { postingId, currentUser, text } = await req.json()

  if (!text) {
    return NextResponse.json({ error: '댓글을 입력하세요!' }, { status: 409 })
  }

  try {
    await connectMongo()
    const comment = await Comment.findOneAndUpdate(
      {
        postingId,
      },
      {
        $push: {
          user: {
            commentId: uuid(),
            userImage: currentUser.image,
            userId: currentUser.id,
            userName: currentUser.name,
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
    const comment = await Comment.findOneAndUpdate(
      {
        postingId,
      },
      { $pull: { user: { commentId } } },
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
    const comment = await Comment.findOneAndUpdate(
      {
        postingId,
      },
      { $set: { 'user.$[elem].text': text } },
      { arrayFilters: [{ 'elem.commentId': commentId }], new: true },
    )
    return NextResponse.json(comment.user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
