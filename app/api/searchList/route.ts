import { PostingType } from '@/app/interfaces/interface'
import { connectMongo } from '@/app/utils/database'
import { Posting } from '@/models/posting'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('search')
  const page = Number(req.nextUrl.searchParams.get('page') as string)
  const limit = Number(req.nextUrl.searchParams.get('limit') as string)

  if (!keyword || keyword.trim() === '') {
    return NextResponse.json(
      { error: '올바른 검색어를 입력하세요!' },
      { status: 409 },
    )
  }

  try {
    await connectMongo()
    const options = [
      { title: { $regex: new RegExp(keyword, 'i') } },
      { description: { $regex: new RegExp(keyword, 'i') } },
      { content: { $regex: new RegExp(keyword, 'i') } },
    ]

    const postings = await Posting.find<PostingType>({
      $or: options,
    })
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)

    const postingCount = await Posting.find<PostingType>({
      $or: options,
    }).countDocuments()

    if (postings) {
      return NextResponse.json({ postings, postingCount }, { status: 201 })
    } else {
      return NextResponse.json(
        { postings: [], postingCount: 0 },
        { status: 204 },
      )
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
