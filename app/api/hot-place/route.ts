import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { HotPlace } from '../../../models/hot-place'
import { HotPlaceListingType, ImageType } from '@/interfaces/interface'
import { deleteObject, ref } from 'firebase/storage'
import { storage } from '@/lib/firebase'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function GET(req: NextRequest) {
  const searchKeyword = req.nextUrl.searchParams.get('searchKeyword')
  const category = req.nextUrl.searchParams.get('category')
  const gu = req.nextUrl.searchParams.get('gu')

  const categoryArr = category?.split(',')
  const guArr = gu?.split(',')

  const options = [
    !searchKeyword ? {} : { store: { $regex: new RegExp(searchKeyword, 'i') } },
    !category ? {} : { category: { $in: categoryArr } },
    !gu ? {} : { gu: { $in: guArr } },
  ]

  try {
    await connectMongo()

    const hotPlaceListings = await HotPlace.find<HotPlaceListingType>({
      $and: options,
    }).sort({
      createdAt: -1,
    })

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

  const si = data.address.split(' ')[0]
  const gu = data.address.split(' ')[1]

  try {
    await connectMongo()
    await HotPlace.create({ ...data, si, gu, creator: session?.user.id })

    return NextResponse.json({ message: '스토어 추가 성공!' }, { status: 201 })
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

    await hotPlaceListing.images.forEach((image: ImageType) => {
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

export async function PUT(req: NextRequest) {
  const { data, deletedImagesArray, storeId, creator } = await req.json()

  const si = data.address.split(' ')[0]
  const gu = data.address.split(' ')[1]

  try {
    await connectMongo()
    await HotPlace.updateOne({ _id: storeId }, { ...data, si, gu, creator })
    await deletedImagesArray.forEach((image: ImageType) => {
      deleteObject(ref(storage, image.path))
    })

    return NextResponse.json({ message: '스토어 수정 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
