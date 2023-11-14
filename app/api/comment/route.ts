import { CommentType } from '@/app/interfaces/interface'
import { connectMongo } from '@/app/utils/database'
import { Comment } from '@/models/comment'
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

  try {
    await connectMongo()
    await Comment.updateOne(
      {
        postingId,
      },
      {
        $push: {
          user: {
            commentId: uuid(),
            userImage: currentUser.image,
            userId: currentUser._id,
            userName: currentUser.name,
            createdAt: new Date(),
            text,
          },
        },
      },
    )
    return NextResponse.json({ status: 200 })
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
    await Comment.updateOne(
      {
        postingId,
      },
      { $pull: { user: { commentId } } },
    )

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { postingId, commentId, text } = await req.json()

  try {
    await connectMongo()
    await Comment.updateOne(
      {
        postingId,
      },
      { $set: { 'user.$[elem].text': text } },
      { arrayFilters: [{ 'elem.commentId': commentId }] },
    )
    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
