import React from 'react'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { homeKeys } from '@/constants/queryKey'
import NewUpdateList from './NewUpdateList'
import { getCommits } from '@/actions/getCommits'
import { BRANCH, PER_PAGE } from '@/constants'

export default async function NewUpdates() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: homeKeys.newUpdates(),
    queryFn: () => getCommits(BRANCH, PER_PAGE),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="h-full">
      <h4 className="mb-2 text-lg font-medium">최신 업데이트</h4>
      <HydrationBoundary state={dehydratedState}>
        <NewUpdateList />
      </HydrationBoundary>
    </div>
  )
}
