import React from 'react'
import WeatherInfo from './WeatherInfo'

export default function Weather() {
  return (
    <div className="h-full">
      <h4 className="text-lg font-medium mb-2">날씨</h4>
      <WeatherInfo />
    </div>
  )
}
