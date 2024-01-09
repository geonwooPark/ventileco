import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { HotPlace } from '../../../models/hot-place'

export async function GET(req: NextRequest) {
  try {
    await connectMongo()

    const hotPlaceListings = await HotPlace.find()
    return NextResponse.json(hotPlaceListings, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    await connectMongo()
    await HotPlace.create(data)

    return NextResponse.json({ message: '맛집 추가 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
