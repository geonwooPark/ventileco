import { connectMongo } from '@/app/lib/database'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { LikeType } from '@/app/interfaces/interface'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    const like = await Favorite.findOne<LikeType>({
      postingId,
    })
    return NextResponse.json(like?.count, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
