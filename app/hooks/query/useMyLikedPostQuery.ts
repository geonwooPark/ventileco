import { useQuery } from '@tanstack/react-query'
import getData from '../../actions/getData'
import { LikeType } from '../../interfaces/interface'
import { Session } from 'next-auth'
import { myPageKeys } from '@/app/constants/queryKey'

export default function useMyLikedPostQuery(session: Session | null) {
  const { data: myLikedPost, isPending } = useQuery({
    queryKey: myPageKeys.myLikedPost(session?.user.id),
    queryFn: () =>
      getData<LikeType[]>(
        `${process.env.NEXT_PUBLIC_FE_URL}/api/my-liked-post?userId=${session?.user.id}`,
      ),
    staleTime: 1000 * 60 * 5, // 5분
    gcTime: 1000 * 60 * 5, // 5분
  })
  return { myLikedPost, isPending }
}
