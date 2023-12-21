import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { detailKeys } from '@/app/constants/queryKey'

export default function useLikeCountQuery(postingId: string) {
  const {
    data: likeCount,
    isPending,
    error,
  } = useQuery({
    queryKey: detailKeys.likeCount(postingId),
    queryFn: () =>
      getData<number>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/like-count?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })
  return { likeCount, isPending, error }
}
