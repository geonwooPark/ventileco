import { connectMongo } from '@/app/_utils/database'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'
import { FavoriteType } from '@/app/_interfaces/interface'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]/route'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)

  try {
    await connectMongo()
    const MyFavoriteList = await Favorite.find<FavoriteType>({
      userId: session?.user.id,
    }).sort({ createdAt: -1 })

    return NextResponse.json(MyFavoriteList, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
