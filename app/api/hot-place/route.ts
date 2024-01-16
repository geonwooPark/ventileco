import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { HotPlace } from '../../../models/hot-place'
import { HotPlaceListing } from '@/interfaces/interface'

export async function GET(req: NextRequest) {
  const searchKeyword = req.nextUrl.searchParams.get('searchKeyword')
  if (!searchKeyword) return NextResponse.json([], { status: 200 })

  const regexPattern = new RegExp(searchKeyword, 'i')

  try {
    await connectMongo()

    const hotPlaceListings = await HotPlace.find<HotPlaceListing>(
      searchKeyword === 'all' ? {} : { store: { $regex: regexPattern } },
    )

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

export async function DELETE(req: NextRequest) {
  const storeId = await req.json()

  try {
    await connectMongo()
    await HotPlace.findByIdAndDelete({ _id: storeId })

    return NextResponse.json({ message: '스토어 제거 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
