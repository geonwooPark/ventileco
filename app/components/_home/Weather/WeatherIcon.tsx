import dayjs from '@/lib/dayjs'
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
    size: '100',
    className: 'mx-auto',
  }
  const currentHour = dayjs(new Date()).tz().hour()

  switch (main) {
    case 'Clear':
      if (currentHour <= 18 && currentHour >= 6) {
        return <WiDaySunny {...props} />
      }
      return <WiNightClear {...props} />
    case 'Clouds':
      if (currentHour <= 18 && currentHour >= 6) {
        return <WiCloud {...props} />
      }
      return <WiNightAltCloudy {...props} />
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
