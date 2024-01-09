import HotPlaceAddButton from '@hot-place/HotPlaceAddButton'
import Map from '@hot-place/Map/Map'
import SideInfo from '@hot-place/SideInfo/SideInfo'
import Main from '@common/Main'
import React from 'react'
import { HotPlace } from '../../../models/hot-place'
import { connectMongo } from '@/lib/database'
import { HotPlacelistings } from '@/interfaces/interface'
import getQueryClient from '@/actions/getQueryClient'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { hotPlaceKeys } from '@/constants/queryKey'

const getHotPlaceListings = async () => {
  await connectMongo()
  try {
    const hotPlaceListings = await HotPlace.find<HotPlacelistings>()

    return hotPlaceListings
  } catch (error) {
    return []
  }
}

export default async function page() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: hotPlaceKeys.hotPlaceListings(),
    queryFn: getHotPlaceListings,
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <Main>
      <HydrationBoundary state={dehydratedState}>
        <Map />
        <SideInfo />
      </HydrationBoundary>
      <HotPlaceAddButton />
    </Main>
  )
}
