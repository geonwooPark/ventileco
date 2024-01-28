import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceListingType } from '@/interfaces/interface'

export default function useHotPlaceListings(
  searchKeyword?: string,
  category?: string,
  gu?: string,
) {
  const {
    data: hotPlaceListings,
    isPending,
    error,
  } = useQuery({
    queryKey: hotPlaceKeys.hotPlaceListing(searchKeyword, category, gu),
    queryFn: () =>
      getData<HotPlaceListingType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/hot-place?searchKeyword=${searchKeyword}&category=${category}&gu=${gu}`,
      ),
    staleTime: !searchKeyword ? 1000 * 60 * 50 : 1000 * 60 * 3,
    gcTime: !searchKeyword ? 1000 * 60 * 60 : 1000 * 60 * 5,
  })
  return { hotPlaceListings, isPending, error }
}
