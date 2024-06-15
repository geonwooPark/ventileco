'use client'

import React from 'react'
import SkeletonWeatherInfo from './SkeletonWeatherInfo'
import useWeatherQuery from '@/hooks/query/useWeatherQuery'
import { APIKEY, CITY } from '@/constants'
import dynamic from 'next/dynamic'
import WeatherDesc from './WeatherDesc'

const WeatherIcon = dynamic(() => import('./WeatherIcon'))

export default function WeatherInfo() {
  const { weatherData, isPending } = useWeatherQuery(CITY, APIKEY)
  if (isPending) return <SkeletonWeatherInfo />

  return (
    <div className="w-full font-normal">
      <WeatherIcon main={weatherData?.weather[0].main} />

      <div className="mb-3 flex-1 text-center">
        <p className="text-sm">Seoul</p>
        <p className="relative mb-1 text-5xl font-bold after:absolute after:top-0 after:text-3xl after:content-['°']">
          {parseInt(weatherData?.main.temp)}
        </p>
        <div className="font-normal text-sm text-gray-700">
          <span className="relative mr-2 after:absolute after:top-0 after:text-sm after:content-['°']">
            Max {parseInt(weatherData?.main.temp_max)}
          </span>
          <span> / </span>
          <span className="relative after:absolute after:top-0 after:text-sm after:content-['°']">
            Min {parseInt(weatherData?.main.temp_min)}
          </span>
        </div>
      </div>

      <WeatherDesc weatherData={weatherData} />
    </div>
  )
}
