import { weatherMap } from '@/constants'
import React from 'react'

interface WeatherDescProps {
  weatherData:
    | {
        main: any
        weather: any
        rain: any
      }
    | undefined
}

export default function WeatherDesc({ weatherData }: WeatherDescProps) {
  return (
    <p className="text-center">
      {weatherMap.get(Number(weatherData?.weather[0].id))}
    </p>
  )
}
