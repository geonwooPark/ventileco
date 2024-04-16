import { CommentType, ReplyCommentType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { Comment } from '../../../models/comment'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { ReplyComment } from '../../../models/replyComment'
import { revalidatePath } from 'next/cache'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    const comments = await Comment.findOne<CommentType>({ postingId })
    const replyComments = await ReplyComment.findOne<ReplyCommentType>({
      postingId,
    })
    if (!comments)
      return NextResponse.json(
        { comments: [], replyComments: [] },
        { status: 200 },
      )
    if (!replyComments)
      return NextResponse.json(
        { comments: comments.user, replyComments: [] },
        { status: 200 },
      )

    return NextResponse.json(
      { comments: comments.user, replyComments: replyComments.user },
      { status: 200 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { postingId, text } = await req.json()
  const session = await getServerSession(authOptions)

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
            userImage: session?.user.image,
            userId: session?.user.id,
            userName: session?.user.name,
            createdAt: new Date(),
            text,
            deleted: false,
          },
        },
      },
      { new: true },
    )

    revalidatePath(`/blog/detail/${postingId}`)
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

    const replyComment = await ReplyComment.find(
      {
        postingId,
      },
      {
        user: {
          $elemMatch: {
            commentId,
          },
        },
      },
    )

    const comment = await Comment.findOneAndUpdate(
      {
        postingId,
      },
      replyComment[0].user.length !== 0
        ? { $set: { 'user.$[elem].deleted': true } }
        : { $pull: { user: { commentId } } },
      { arrayFilters: [{ 'elem.commentId': commentId }], new: true },
    )

    revalidatePath(`/blog/detail/${postingId}`)
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

    revalidatePath(`/blog/detail/${postingId}`)
    return NextResponse.json(comment.user, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
