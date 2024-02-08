import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { detailKeys } from '@/constants/queryKey'

export default function useLikeQuery(postingId: string) {
  const { data, isPending, error } = useQuery({
    queryKey: detailKeys.like(postingId),
    queryFn: () =>
      getData<{ likes: number; isLike: boolean }>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/like?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })
  return { data, isPending, error }
}
