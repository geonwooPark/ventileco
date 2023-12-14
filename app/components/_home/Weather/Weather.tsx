import React from 'react'
import WeatherInfo from './WeatherInfo'

export default function Weather() {
  return (
    <div className="h-full">
      <h4 className="mb-2 text-lg font-medium">날씨</h4>
      <WeatherInfo />
    </div>
  )
}
