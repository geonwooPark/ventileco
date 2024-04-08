import Main from '@common/Main'
import React from 'react'
import getQueryClient from '@/utils/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { hotPlaceKeys } from '@/constants/queryKey'
import getAllStore from '@/actions/_hot-place/getAllStore'
import Map from '@/components/_hot-place/Map/Map'

export const dynamic = 'force-dynamic'

export default async function page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: hotPlaceKeys.hotPlaceListing(),
    queryFn: getAllStore,
    staleTime: 1000 * 60 * 50, // 50분
    gcTime: 1000 * 60 * 60, // 1시간
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Main className="p-4">
      <HydrationBoundary state={dehydratedState}>
        <Map />
      </HydrationBoundary>
    </Main>
  )
}
