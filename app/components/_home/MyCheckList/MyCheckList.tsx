import React from 'react'
import CheckListWrapper from './CheckListWrapper'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import dayjs from '@/lib/dayjs'
import { connectMongo } from '@/lib/database'
import { CheckListType } from '@/interfaces/interface'
import { homeKeys } from '@/constants/queryKey'
import { CheckList } from '../../../../models/checklist'

const getCheckList = async (date: string) => {
  await connectMongo()
  try {
    const result = await CheckList.findOne<CheckListType>({
      date,
    })
    if (!result) return
    const checkList = [...result.list].reverse()

    return checkList
  } catch (error) {
    return []
  }
}

export default async function MyCheckList() {
  const date = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: homeKeys.checkList(date),
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
