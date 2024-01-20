import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { hotPlaceKeys } from '@/constants/queryKey'
import { HotPlaceListingType } from '@/interfaces/interface'

export default function useHotPlaceListings(searchKeyword = 'all') {
  const {
    data: hotPlaceListings,
    isPending,
    error,
  } = useQuery({
    queryKey: hotPlaceKeys.hotPlaceListing(searchKeyword),
    queryFn: () =>
      getData<HotPlaceListingType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/hot-place?searchKeyword=${searchKeyword}`,
      ),
    staleTime: searchKeyword === 'all' ? 1000 * 60 * 50 : 1000 * 60 * 3,
    gcTime: searchKeyword === 'all' ? 1000 * 60 * 60 : 1000 * 60 * 5,
  })
  return { hotPlaceListings, isPending, error }
}
