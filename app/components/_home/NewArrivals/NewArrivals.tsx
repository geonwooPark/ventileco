import React from 'react'
import NewArrivalsList from './NewArrivalsList'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import getQueryClient from '@/app/actions/getQueryClient'
import { connectMongo } from '@/app/utils/database'
import { Posting } from '@/models/posting'
import { PostingType } from '@/app/interfaces/interface'
import { homeKeys } from '@/app/constants/queryKey'

const getNewArrivals = async () => {
  await connectMongo()
  try {
    const listing = await Posting.find<PostingType>({})
      .sort({
        createdAt: -1,
      })
      .limit(5)

    return listing
  } catch (error) {
    return
  }
}

export default async function NewArrivals() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: homeKeys.newArrivals(),
    queryFn: getNewArrivals,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="h-full">
      <h4 className="mb-2 text-lg font-medium">최신 게시글</h4>
      <HydrationBoundary state={dehydratedState}>
        <NewArrivalsList />
      </HydrationBoundary>
    </div>
  )
}
