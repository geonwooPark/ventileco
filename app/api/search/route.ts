import { connectMongo } from '@/app/utils/database'
import { PostingType } from '@/app/utils/getPosting'
import { Posting } from '@/models/posting'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword')
  if (!keyword || keyword.trim() === '') {
    return NextResponse.json(
      { error: '올바른 검색어를 입력하세요!' },
      { status: 400 },
    )
  }

  try {
    connectMongo()
    const options = [
      { title: { $regex: new RegExp(keyword, 'i') } },
      { description: { $regex: new RegExp(keyword, 'i') } },
      { content: { $regex: new RegExp(keyword, 'i') } },
    ]
    const postings = await Posting.find<PostingType>({
      $or: options,
    }).sort({ createdAt: -1 })
    return NextResponse.json(postings, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
