import React from 'react'
import WeatherInfo from './WeatherInfo'
import getQueryClient from '@/app/actions/getQueryClient'
import getData from '@/app/actions/getData'
import { HydrationBoundary, dehydrate } from '@tanstack/react-query'
import { APIKEY, CITY } from '@/app/constants'
import { homeKeys } from '@/app/constants/queryKey'

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
    <div className="h-full">
      <h4 className="mb-2 text-lg font-medium">날씨</h4>
      <HydrationBoundary state={dehydratedState}>
        <WeatherInfo />
      </HydrationBoundary>
    </div>
  )
}
