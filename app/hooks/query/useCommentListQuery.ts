import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { CommentUserType } from '../../interfaces/interface'
import { detailKeys } from '@/constants/queryKey'

export default function useCommentListQuery(postingId: string) {
  const {
    data: comments,
    isPending,
    error,
  } = useQuery({
    queryKey: detailKeys.comment(postingId),
    queryFn: () =>
      getData<CommentUserType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/comment?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })

  return { comments, isPending, error }
}
