import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface HandleLikeButtonParams {
  postingId: string
  session: Session | null
  isLiked?: boolean
}

const handleLikeButton = async ({
  postingId,
  session,
  isLiked,
}: HandleLikeButtonParams) => {
  if (!session) return

  await fetch('/api/like', {
    method: isLiked ? 'DELETE' : 'POST',
    body: JSON.stringify({
      postingId: postingId,
      userId: session.user.id,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useHandleLikeButtonMutation({
  postingId,
  session,
}: Pick<HandleLikeButtonParams, 'postingId' | 'session'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ postingId, session, isLiked }: HandleLikeButtonParams) =>
      handleLikeButton({
        postingId,
        session,
        isLiked,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: detailKeys.isLiked(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: detailKeys.likeCount(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myLikedPost(session?.user.id),
      })
    },
  })
  return { mutation }
}
