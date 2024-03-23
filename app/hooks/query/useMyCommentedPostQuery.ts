import { useQuery } from '@tanstack/react-query'
import getData from '../../utils/getData'
import { CommentType } from '../../interfaces/interface'
import { Session } from 'next-auth'
import { myPageKeys } from '@/constants/queryKey'

export default function useMyCommentedPostQuery(session: Session | null) {
  const { data: myCommentedPost, isPending } = useQuery({
    queryKey: myPageKeys.myCommentedPost(session?.user.id),
    queryFn: () =>
      getData<CommentType[]>(
        `/api/mypage/my-commented-post?userId=${session?.user.id}`,
      ),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
  })

  return { myCommentedPost, isPending }
}
