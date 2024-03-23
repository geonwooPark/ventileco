import { useQuery } from '@tanstack/react-query'
import getData from '../../utils/getData'
import { homeKeys } from '@/constants/queryKey'

export default function useWeatherQuery(CITY: string, APIKEY: string) {
  const { data: weatherData, isPending } = useQuery({
    // eslint-disable-next-line
    queryKey: homeKeys.weather(),
    queryFn: () =>
      getData<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}&units=metric`,
      ),
    select: (data) => ({
      main: data.main,
      weather: data.weather,
      rain: data.rain,
    }),
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 60,
    throwOnError: true,
  })
  return { weatherData, isPending }
}
