import { connectMongo } from '@/app/utils/database'
import { PostingType } from '@/app/utils/getPosting'
import { Posting } from '@/models/posting'
import { NextRequest, NextResponse } from 'next/server'

interface IParams {
  category: string
}

export async function GET(req: NextRequest, { params }: { params: IParams }) {
  const { category } = params
  try {
    connectMongo()
    const postings = await Posting.find<PostingType>({ category }).sort({
      createdAt: -1,
    })
    return NextResponse.json(postings, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
