import React from 'react'
import CheckListWrapper from './CheckListWrapper'
import getQueryClient from '@/app/actions/getQueryClient'
import { CheckListType } from '@/app/interfaces/interface'
import getData from '@/app/actions/getData'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import dayjs from '@/app/utils/dayjs'

export default async function MyCheckList() {
  const date = dayjs(new Date()).tz().format('YYYY-MM-DD')

  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['checklist', { date }],
    queryFn: () =>
      getData<CheckListType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/check-list?date=${date}`,
      ),
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
