'use client'

import weatherDescEngToKor from '@/app/utils/weatherDescEngToKor'
import React from 'react'
import WeatherIcon from './WeatherIcon'
import SkeletonWeatherInfo from './SkeletonWeatherInfo'
import { APIKEY, CITY } from './Weather'
import useWeatherQuery from '@/app/hooks/query/useWeatherQuery'

export default function WeatherInfo() {
  const { weatherData, isPending, error } = useWeatherQuery(CITY, APIKEY)

  if (isPending) return <SkeletonWeatherInfo />

  return (
    <div className="w-full -translate-y-3">
      <div>
        <WeatherIcon main={weatherData?.weather[0].main} />
      </div>

      <div className="mb-3 flex-1 text-center">
        <p className="text-sm">서울특별시</p>
        <p className="relative mb-1 text-5xl font-bold after:absolute after:top-0 after:text-3xl after:content-['°']">
          {parseInt(weatherData?.main.temp)}
        </p>
        <div className="text-sm text-gray-400">
          <span className="relative mr-2 after:absolute after:top-0 after:text-sm after:content-['°']">
            최고 {parseInt(weatherData?.main.temp_max)}
          </span>
          <span className="relative after:absolute after:top-0 after:text-sm after:content-['°']">
            최저 {parseInt(weatherData?.main.temp_min)}
          </span>
        </div>
      </div>

      <p className="text-center font-light">
        {weatherDescEngToKor(Number(weatherData?.weather[0].id))}
      </p>
    </div>
  )
}
