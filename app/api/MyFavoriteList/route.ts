import { connectMongo } from '@/app/_utils/database'
import getCurrentUser from '@/app/_actions/getCurrentUser'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { FavoriteType } from '@/app/_interfaces/interface'

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser()
  try {
    await connectMongo()
    const MyFavoriteList = await Favorite.find<FavoriteType>({
      userId: currentUser._id,
    }).sort({ createdAt: -1 })

    return NextResponse.json(MyFavoriteList, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
