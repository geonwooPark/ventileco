import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { HotPlace } from '../../../models/hot-place'
import { HotPlaceListingType } from '@/interfaces/interface'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function GET(req: NextRequest) {
  const searchKeyword = req.nextUrl.searchParams.get('searchKeyword')
  if (!searchKeyword) return NextResponse.json([], { status: 200 })

  const regexPattern = new RegExp(searchKeyword, 'i')

  try {
    await connectMongo()

    const hotPlaceListings = await HotPlace.find<HotPlaceListingType>(
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
  const session = await getServerSession(authOptions)

  try {
    await connectMongo()
    await HotPlace.create({ ...data, creator: session?.user.id })

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
    const hotPlaceListing = await HotPlace.findByIdAndDelete({ _id: storeId })

    await hotPlaceListing.images.forEach((image: any) => {
      deleteObject(ref(storage, image.path))
    })

    return NextResponse.json({ message: '스토어 제거 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
