import { useQuery } from '@tanstack/react-query'
import getData from '../actions/getData'

export default function useWeatherQuery(CITY: string, APIKEY: string) {
  const {
    data: weatherData,
    isPending,
    error,
  } = useQuery({
    // eslint-disable-next-line
    queryKey: ['weather'],
    queryFn: () =>
      getData<any>(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${APIKEY}&units=metric`,
      ),
    select: (data) => ({
      main: data.main,
      weather: data.weather,
      rain: data.rain,
    }),
    staleTime: 1000 * 6 * 60,
    gcTime: 1000 * 6 * 60,
  })
  return { weatherData, isPending, error }
}
