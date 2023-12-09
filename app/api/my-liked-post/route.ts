import { connectMongo } from '@/app/_utils/database'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { FavoriteType } from '@/app/_interfaces/interface'

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId')

  try {
    await connectMongo()
    const myLikedPost = await Favorite.find<FavoriteType>({
      userId,
    }).sort({ createdAt: -1 })

    return NextResponse.json(myLikedPost, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
