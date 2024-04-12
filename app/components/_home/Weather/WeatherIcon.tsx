import dayjs from '@/lib/dayjs'
import React from 'react'
import {
  Clear,
  Cloudy,
  Fog,
  NightClear,
  NightCloudy,
  Rain,
  Shower,
  Snow,
  Thunderstorm,
} from '../../../../public/svgs/weatherIcons'

interface WeatherIconProps {
  main: string
}

export default function WeatherIcon({ main }: WeatherIconProps) {
  const props = {
    className: 'mx-auto size-[100px]',
  }
  const currentHour = dayjs(new Date()).tz().hour()
  const isDaytime = currentHour <= 18 && currentHour >= 6

  switch (main) {
    case 'Clear':
      return isDaytime ? <Clear {...props} /> : <NightClear {...props} />
    case 'Clouds':
      return isDaytime ? <Cloudy {...props} /> : <NightCloudy {...props} />
    case 'Rain':
      return <Rain {...props} />
    case 'Drizzle':
      return <Shower {...props} />
    case 'Thunderstorm':
      return <Thunderstorm {...props} />
    case 'Snow':
      return <Snow {...props} />
    case 'Mist':
    case 'Smoke':
    case 'Haze':
    case 'Dust':
    case 'Fog':
    case 'Sand':
    case 'Ash':
    case 'Squall':
    case 'Tornado':
      return <Fog {...props} />
    default:
      return null
  }
}
