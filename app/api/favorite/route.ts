import { connectMongo } from '@/app/utils/database'
import getCurrentUser from '@/app/utils/getCurrentUser'
import { Favorite } from '@/models/favorite'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const postingId = req.nextUrl.searchParams.get('postingId')
  const currentUser = await getCurrentUser()
  try {
    await connectMongo()
    const isFav = await Favorite.findOne({
      postingId,
      userId: currentUser._id,
    })
    if (isFav) {
      return NextResponse.json(1, { status: 200 })
    } else return NextResponse.json(0, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { postingId, userId } = await req.json()

  try {
    await connectMongo()
    await Favorite.updateOne(
      {
        postingId,
      },
      { $push: { userId } },
    )

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { postingId, userId } = await req.json()

  try {
    await connectMongo()
    await Favorite.updateOne(
      {
        postingId,
      },
      { $pull: { userId } },
    )

    return NextResponse.json({ status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
