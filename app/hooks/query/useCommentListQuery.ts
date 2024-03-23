import { useQuery } from '@tanstack/react-query'
import getData from '../../utils/getData'
import {
  CommentUserType,
  ReplyCommentUserType,
} from '../../interfaces/interface'
import { detailKeys } from '@/constants/queryKey'

export default function useCommentListQuery(postingId: string) {
  const {
    data: allComment,
    isPending,
    error,
  } = useQuery({
    queryKey: detailKeys.comment(postingId),
    queryFn: () =>
      getData<{
        comments: CommentUserType[]
        replyComments: ReplyCommentUserType[]
      }>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/blog/comment?postingId=${postingId}`,
      ),
    staleTime: 1000 * 60 * 3, // 3분
    gcTime: 1000 * 60 * 5, // 5분
  })

  return { allComment, isPending, error }
}
