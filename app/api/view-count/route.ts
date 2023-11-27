import { connectMongo } from '@/app/_utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { PostingType } from '@/app/_interfaces/interface'
import { Posting } from '@/models/posting'
import getCurrentUser from '@/app/_actions/getCurrentUser'

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser()
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    if (!currentUser || currentUser.role !== 'admin') {
      await Posting.updateOne(
        {
          _id: postingId,
        },
        {
          $inc: { views: 1 },
        },
      )
    }
    const posting = await Posting.findOne<PostingType>({
      _id: postingId,
    })
    return NextResponse.json(posting?.views, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
