import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { detailKeys } from '@/constants/queryKey'

export default function useViewQuery(postingId: string) {
  const {
    data: views,
    isPending,
    error,
  } = useQuery({
    queryKey: detailKeys.view(postingId),
    queryFn: () =>
      getData<number>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/blog/view?postingId=${postingId}`,
      ),
  })
  return { views, isPending, error }
}
