import { connectMongo } from '@/app/_utils/database'
import { NextRequest, NextResponse } from 'next/server'
import { PostingType } from '@/app/_interfaces/interface'
import { Posting } from '@/models/posting'
import { authOptions } from '../auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    if (!session || session.user.role !== 'admin') {
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
