import { useQuery } from '@tanstack/react-query'
import getData from '../actions/getData'
import { Session } from 'next-auth'
import { myCommentType } from '../interfaces/interface'

export default function useMyCommentQuery(session: Session | null) {
  const {
    data: myComment,
    isPending,
    error,
  } = useQuery({
    queryKey: ['my-comment', { user: session?.user.id }],
    queryFn: () =>
      getData<myCommentType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/my-comment?userId=${session?.user.id}`,
      ),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
  })

  return { myComment, isPending, error }
}
