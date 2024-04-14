import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { LikeType } from '@/interfaces/interface'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { Favorite } from '../../../models/favorite'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')
  const session = await getServerSession(authOptions)

  try {
    await connectMongo()
    const like = await Favorite.findOne<LikeType>({
      postingId,
    })

    if (!like) return NextResponse.json(null, { status: 404 })

    const isLike = like.userId.includes(session?.user.id as string)
    return NextResponse.json(
      { likes: like.userId.length, isLike },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { postingId } = await req.json()
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json(null, { status: 404 })

  try {
    await connectMongo()

    const like = await Favorite.findOne<LikeType>({
      postingId,
    })
    if (!like) return NextResponse.json(null, { status: 404 })

    const isLike = like.userId.includes(session?.user.id as string)
    await Favorite.updateOne(
      {
        postingId,
      },
      isLike
        ? { $pull: { userId: session?.user.id } }
        : { $push: { userId: session?.user.id } },
    )

    return NextResponse.json(null, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
