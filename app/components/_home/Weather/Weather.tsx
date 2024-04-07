import React from 'react'
import WeatherInfo from './WeatherInfo'
import getQueryClient from '@/utils/getQueryClient'
import getData from '@/utils/getData'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { APIKEY, CITY } from '@/constants'
import { homeKeys } from '@/constants/queryKey'

export default async function Weather() {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: homeKeys.weather(),
    queryFn: () =>
      getData(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}&units=metric`,
      ),
  })
  const dehydratedState = dehydrate(queryClient)

  return (
    <div className="h-full font-point">
      <h4 className="mb-2 text-lg">Weather</h4>
      <HydrationBoundary state={dehydratedState}>
        <WeatherInfo />
      </HydrationBoundary>
    </div>
  )
}
