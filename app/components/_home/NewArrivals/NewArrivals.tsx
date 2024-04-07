import React from 'react'
import NewArrivalsList from './NewArrivalsList'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import getQueryClient from '@/utils/getQueryClient'
import { connectMongo } from '@/lib/database'
import { Posting } from '../../../../models/posting'
import { PostingType } from '@/interfaces/interface'
import { homeKeys } from '@/constants/queryKey'

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
      <h4 className="mb-2 font-point text-lg">New Arrivals</h4>
      <HydrationBoundary state={dehydratedState}>
        <NewArrivalsList />
      </HydrationBoundary>
    </div>
  )
}
