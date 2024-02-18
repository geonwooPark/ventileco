import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { HotPlace } from '../../../../models/hot-place'

export async function GET(req: NextRequest) {
  const keyword = req.nextUrl.searchParams.get('keyword')

  const regexPattern = new RegExp(`^${keyword}`, 'i')

  try {
    await connectMongo()

    const stores = await HotPlace.find({
      store: { $regex: regexPattern },
    }).limit(5)

    return NextResponse.json(stores, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
