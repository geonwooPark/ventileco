import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { Book } from '../../../models/book'
import { BookReviewType } from '@/interfaces/interface'
import { BOOKLIMIT } from '@/constants'

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
