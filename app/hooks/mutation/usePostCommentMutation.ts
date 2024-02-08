import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface PostCommentParams {
  postingId: string
  commentId?: string
  text: string
}

const postComment = async ({
  postingId,
  commentId,
  text,
}: PostCommentParams) => {
  await fetch(commentId ? '/api/reply-comment' : '/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postingId,
      commentId,
      text,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function usePostCommentMutation({
  session,
  postingId,
}: {
  session: Session | null
  postingId: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ postingId, commentId, text }: PostCommentParams) =>
      postComment({ postingId, commentId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: detailKeys.comment(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myComment(session?.user.id),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myCommentedPost(session?.user.id),
      })
    },
  })
  return { mutation }
}
