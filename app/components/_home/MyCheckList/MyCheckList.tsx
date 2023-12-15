import React from 'react'
import CheckListWrapper from './CheckListWrapper'
import getQueryClient from '@/app/actions/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import dayjs from '@/app/utils/dayjs'
import { connectMongo } from '@/app/utils/database'
import { CheckList } from '@/models/checklist'

const getCheckList = async (date: string) => {
  await connectMongo()
  try {
    const checkList = await CheckList.findOne({
      date,
    })
    return [...checkList.list].reverse()
  } catch (error) {
    return []
  }
}

export default async function MyCheckList() {
  const date = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['checklist', { date }],
    queryFn: () => getCheckList(date),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <div>
      <h4 className="mr-2 text-lg font-medium">체크 리스트</h4>
      <HydrationBoundary state={dehydratedState}>
        <CheckListWrapper />
      </HydrationBoundary>
    </div>
  )
}
