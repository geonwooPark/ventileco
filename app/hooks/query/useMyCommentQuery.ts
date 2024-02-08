import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { Session } from 'next-auth'
import { MyCommentType } from '../../interfaces/interface'
import { myPageKeys } from '@/constants/queryKey'

export default function useMyCommentQuery(session: Session | null) {
  const { data: myComment, isPending } = useQuery({
    queryKey: myPageKeys.myComment(session?.user.id),
    queryFn: () =>
      getData<MyCommentType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/mypage/my-comment?userId=${session?.user.id}`,
      ),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
  })

  return { myComment, isPending }
}
