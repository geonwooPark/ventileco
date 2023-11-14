import { connectMongo } from '@/app/utils/database'
import getCurrentUser from '@/app/actions/getCurrentUser'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { FavoriteType } from '@/app/interfaces/interface'

export async function GET(req: NextRequest) {
  const currentUser = await getCurrentUser()
  try {
    await connectMongo()
    const favoriteList = await Favorite.find<FavoriteType>({
      userId: currentUser._id,
    }).sort({ createdAt: -1 })

    return NextResponse.json(favoriteList, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
