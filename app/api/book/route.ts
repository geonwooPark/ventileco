import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { Book } from '../../../models/book'

export async function POST(req: NextRequest) {
  const data = await req.json()

  try {
    await connectMongo()
    await Book.create(data)

    return NextResponse.json({ message: '스토어 추가 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
