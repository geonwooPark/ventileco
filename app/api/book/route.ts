import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { Book } from '../../../models/book'
import { BookReviewType } from '@/interfaces/interface'
import { BOOKLIMIT } from '@/constants'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'

export async function GET(req: NextRequest) {
  const category = req.nextUrl.searchParams.get('category')
  const lastItem = req.nextUrl.searchParams.get('lastItem')

  try {
    await connectMongo()
    const addedBooks = await Book.find<BookReviewType>(
      category === '전체' ? {} : { category },
    )
      .skip(Number(lastItem))
      .limit(BOOKLIMIT)

    return NextResponse.json(addedBooks, { status: 200 })
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
    await Book.create(data)

    return NextResponse.json({ message: '리뷰 추가 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const bookId = await req.json()
  const session = await getServerSession(authOptions)
  if (!session || session?.user.role !== 'admin')
    return NextResponse.json(null, { status: 403 })

  try {
    await connectMongo()
    await Book.findByIdAndDelete({ _id: bookId })

    return NextResponse.json({ message: '리뷰 제거 성공!' }, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PUT(req: NextRequest) {
  const { data, bookId } = await req.json()
  const session = await getServerSession(authOptions)
  if (!session || session?.user.role !== 'admin')
    return NextResponse.json(null, { status: 403 })

  try {
    await connectMongo()
    await Book.updateOne({ _id: bookId }, data)

    return NextResponse.json({ message: '리뷰 수정 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
