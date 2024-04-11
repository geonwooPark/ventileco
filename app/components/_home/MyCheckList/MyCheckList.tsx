import React from 'react'
import CheckListWrapper from './CheckListWrapper'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import dayjs from '@/lib/dayjs'
import { homeKeys } from '@/constants/queryKey'
import getCheckList from '@/actions/_home/getCheckList'

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
      <h4 className="mb-2 font-point text-lg">CheckList</h4>
      <HydrationBoundary state={dehydratedState}>
        <CheckListWrapper />
      </HydrationBoundary>
    </div>
  )
}
