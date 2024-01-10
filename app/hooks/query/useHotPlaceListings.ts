import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceListing } from '@/interfaces/interface'

export default function useHotPlaceListings() {
  const {
    data: hotPlaceListings,
    isPending,
    error,
  } = useQuery({
    queryKey: hotPlaceKeys.hotPlaceListings(),
    queryFn: () =>
      getData<HotPlaceListing[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/hot-place`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })
  return { hotPlaceListings, isPending, error }
}
