import { CheckListType } from '@/interfaces/interface'
import { connectMongo } from '@/lib/database'
import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuid } from 'uuid'
import { CheckList } from '../../../models/checklist'

export async function GET(req: NextRequest) {
  const date = req.nextUrl.searchParams.get('date')

  try {
    await connectMongo()
    const result = await CheckList.findOne<CheckListType>({
      date,
    })
    if (!result) {
      return NextResponse.json([], { status: 200 })
    }

    const checkList = [...result.list].reverse()

    return NextResponse.json(checkList, { status: 200 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function POST(req: NextRequest) {
  const { value: text, today } = await req.json()

  if (!text) {
    return NextResponse.json(
      { error: '할 일을 입력해주세요.', focus: 'category' },
      { status: 406 },
    )
  }

  try {
    await connectMongo()

    const result = await CheckList.findOne({
      date: today,
    })

    if (!result) {
      await CheckList.create({
        date: today,
        list: [],
      })
    }

    await CheckList.updateOne(
      {
        date: today,
      },
      {
        $push: {
          list: {
            listId: uuid(),
            text,
            status: false,
          },
        },
      },
    )

    return NextResponse.json({ message: '리스트 추가 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function DELETE(req: NextRequest) {
  const { listId, today } = await req.json()

  try {
    await connectMongo()
    await CheckList.updateOne(
      {
        date: today,
      },
      { $pull: { list: { listId } } },
    )

    return NextResponse.json({ message: '리스트 삭제 성공!' }, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}

export async function PATCH(req: NextRequest) {
  const { listId, status, today } = await req.json()

  try {
    await connectMongo()
    await CheckList.updateOne(
      {
        date: today,
      },
      { $set: { 'list.$[elem].status': !status } },
      { arrayFilters: [{ 'elem.listId': listId }] },
    )
    return NextResponse.json(
      { message: '리스트 상태 변경 성공!' },
      { status: 201 },
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
