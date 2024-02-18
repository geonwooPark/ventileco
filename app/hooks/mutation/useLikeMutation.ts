import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface HandleLikeParams {
  postingId: string
}

const handleLike = async ({ postingId }: HandleLikeParams) => {
  const result = await fetch('/api/blog/like', {
    method: 'PATCH',
    body: JSON.stringify({
      postingId: postingId,
    }),
  })
  if (!result.ok) throw new Error('좋아요 기능에 에러가 발생했어요!')
}

export default function useLikeMutation({
  postingId,
  session,
}: {
  postingId: string
  session: Session | null
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ postingId }: HandleLikeParams) =>
      handleLike({
        postingId,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: detailKeys.like(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myLikedPost(session?.user.id),
      })
    },
  })
  return { mutation }
}
