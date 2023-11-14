import { connectMongo } from '@/app/utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { Posting } from '@/models/posting'
import { PostingType } from '@/app/interfaces/interface'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('search') as string
  const page = Number(req.nextUrl.searchParams.get('page') as string)
  const limit = Number(req.nextUrl.searchParams.get('limit') as string)

  try {
    await connectMongo()
    const postings = await Posting.find<PostingType>({ category })
      .sort({
        createdAt: -1,
      })
      .skip((page - 1) * limit)
      .limit(limit)

    const postingCount = await Posting.find<PostingType>({
      category,
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
