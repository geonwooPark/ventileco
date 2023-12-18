import { PostingType } from '@/app/interfaces/interface'
import { connectMongo } from '@/app/utils/database'
import { Posting } from '@/models/posting'
import { NextResponse } from 'next/server'

export async function GET() {
  await connectMongo()
  try {
    const newArrivalsList = await Posting.find<PostingType>({})
      .sort({
        createdAt: -1,
      })
      .limit(5)

    return NextResponse.json(newArrivalsList, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
