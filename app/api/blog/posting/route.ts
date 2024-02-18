import { PostingType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { Comment } from '../../../../models/comment'
import { Favorite } from '../../../../models/favorite'
import { Posting } from '../../../../models/posting'
import { NextRequest, NextResponse } from 'next/server'
import { ReplyComment } from '../../../../models/replyComment'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    const posting = await Posting.findOne<PostingType>({ _id: postingId })
    return NextResponse.json(posting, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const posting = await req.json()
  const { category, title, description } = posting

  if (!category) {
    return NextResponse.json(
      { error: '카테고리를 입력해주세요.', focus: 'category' },
      { status: 406 },
    )
  }
  if (!title) {
    return NextResponse.json(
      { error: '제목을 입력해주세요.', focus: 'title' },
      { status: 406 },
    )
  }
  if (title.length > 40) {
    return NextResponse.json(
      { error: '제목은 40자 이하로 입력해주세요.', focus: 'title' },
      { status: 406 },
    )
  }
  if (description.length > 90) {
    return NextResponse.json(
      { error: '설명은 90자 이하로 입력해주세요.', focus: 'description' },
      { status: 406 },
    )
  }

  try {
    await connectMongo()
    const newPosting = await Posting.create(posting)
    await Comment.create({
      postingId: newPosting._id,
      title,
    })
    await ReplyComment.create({
      postingId: newPosting._id,
      title,
    })
    await Favorite.create({
      postingId: newPosting._id,
      title,
    })
    return NextResponse.json({ message: '글 작성 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const id = await req.json()
  try {
    await connectMongo()
    await Posting.findByIdAndDelete({ _id: id })
    await Favorite.deleteMany({ postingId: id })
    await Comment.deleteMany({ postingId: id })
    await ReplyComment.deleteMany({ postingId: id })

    return NextResponse.json({ message: '글 삭제 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  const posting = await req.json()
  const { postingId, category, title, description, thumbnailURL, content } =
    posting

  if (!category) {
    return NextResponse.json(
      { error: '카테고리를 입력해주세요.', focus: 'category' },
      { status: 409 },
    )
  }
  if (!title) {
    return NextResponse.json(
      { error: '제목을 입력해주세요.', focus: 'title' },
      { status: 409 },
    )
  }
  if (title.length > 40) {
    return NextResponse.json(
      { error: '제목은 40자 이하로 입력해주세요.', focus: 'title' },
      { status: 409 },
    )
  }
  if (description.length > 90) {
    return NextResponse.json(
      { error: '설명은 90자 이하로 입력해주세요.', focus: 'description' },
      { status: 409 },
    )
  }

  try {
    await connectMongo()
    await Posting.updateOne(
      { _id: postingId },
      { category, title, description, thumbnailURL, content },
    )

    return NextResponse.json({ message: '글 수정 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
