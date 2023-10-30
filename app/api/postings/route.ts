import { connectMongo } from '@/app/utils/database'
import { Comment } from '@/models/comment'
import { Favorite } from '@/models/favorite'
import { Posting } from '@/models/posting'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { category, title, description, thumbnailURL, content } =
    await req.json()
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

  try {
    connectMongo()
    const newPosting = await Posting.create({
      category,
      title,
      description,
      thumbnailURL,
      content,
    })
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
