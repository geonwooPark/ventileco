import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { PostingType } from '../../interfaces/interface'
import { homeKeys } from '@/app/constants/queryKey'

export default function useNewArrivalsQuery() {
  const { data: newArrivalsList, isPending } = useQuery({
    queryKey: homeKeys.newArrivals(),
    queryFn: () =>
      getData<PostingType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/new-arrivals`,
      ),
    staleTime: 1000 * 60 * 60 * 10, // 10시간
    gcTime: 1000 * 60 * 60 * 10, // 10시간
    throwOnError: true,
  })

  return { newArrivalsList, isPending }
}
