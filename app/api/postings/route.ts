import { connectMongo } from '@/app/utils/database'
import { PostingType } from '@/app/utils/getPosting'
import { Comment } from '@/models/comment'
import { Favorite } from '@/models/favorite'
import { Posting } from '@/models/posting'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    connectMongo()
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
      { message: '카테고리를 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (!title) {
    return NextResponse.json(
      { message: '제목을 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (title.length > 40) {
    return NextResponse.json(
      { message: '제목은 40자 이하로 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (description.length > 90) {
    return NextResponse.json(
      { message: '설명은 90자 이하로 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }

  try {
    connectMongo()
    const newPosting = await Posting.create(posting)
    await Favorite.create({
      postingId: newPosting._id,
    })
    await Comment.create({
      postingId: newPosting._id,
    })
    return NextResponse.json(
      { message: '글 작성 성공!', status: '201' },
      { status: 201 },
    )
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
    connectMongo()
    await Posting.findByIdAndDelete({ _id: id })
    await Favorite.deleteMany({ postingId: id })
    await Comment.deleteMany({ postingId: id })

    return NextResponse.json(
      { message: '글 삭제 성공!', status: '201' },
      { status: 201 },
    )
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
      { message: '카테고리를 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (!title) {
    return NextResponse.json(
      { message: '제목을 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (title.length > 40) {
    return NextResponse.json(
      { message: '제목은 40자 이하로 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }
  if (description.length > 90) {
    return NextResponse.json(
      { message: '설명은 90자 이하로 입력해주세요.', statue: '409' },
      { status: 409 },
    )
  }

  try {
    connectMongo()
    await Posting.updateOne(
      { _id: postingId },
      { category, title, description, thumbnailURL, content },
    )

    return NextResponse.json(
      { message: '글 수정 성공!', status: '201' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
