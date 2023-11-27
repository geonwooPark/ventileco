import { connectMongo } from '@/app/_utils/database'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { FavoriteType } from '@/app/_interfaces/interface'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')

  try {
    await connectMongo()
    const favorites = await Favorite.findOne<FavoriteType>({
      postingId,
    })
    return NextResponse.json(favorites?.count, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
