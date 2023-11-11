import { connectMongo } from '@/app/utils/database'
import { CommentType } from '@/app/actions/getComments'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { Comment } from '@/models/comment'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'

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
