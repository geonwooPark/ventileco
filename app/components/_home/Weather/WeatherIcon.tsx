import React from 'react'
import {
  WiCloud,
  WiDaySunny,
  WiFog,
  WiNightAltCloudy,
  WiNightClear,
  WiRain,
  WiShowers,
  WiSnowflakeCold,
  WiThunderstorm,
} from 'react-icons/wi'

interface WeatherIconProps {
  main: string
}

export default function WeatherIcon({ main }: WeatherIconProps) {
  const props = {
    size: '120',
    className: 'mx-auto',
  }

  const currentDate = new Date()
  const currentHour = currentDate.getHours()

  switch (main) {
    case 'Clear':
      if (currentHour <= 18) {
        return <WiDaySunny {...props} />
      }
      return <WiNightClear />
    case 'Clouds':
      if (currentHour <= 18) {
        return <WiCloud {...props} />
      }
      return <WiNightAltCloudy />
    case 'Rain':
      return <WiRain {...props} />
    case 'Drizzle':
      return <WiShowers {...props} />
    case 'Thunderstorm':
      return <WiThunderstorm {...props} />
    case 'Snow':
      return <WiSnowflakeCold {...props} />
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return <WiFog {...props} />
  }
}
