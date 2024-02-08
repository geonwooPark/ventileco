import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface DeleteCommentParams {
  postingId: string
  commentId: string
  type: 'origin' | 'reply'
}

const deleteComment = async ({
  postingId,
  commentId,
  type,
}: DeleteCommentParams) => {
  await fetch(type === 'origin' ? '/api/comment' : '/api/reply-comment', {
    method: 'DELETE',
    body: JSON.stringify({
      postingId,
      commentId,
    }),
  })
    .then((res) => res.json())
    .then((result) => {
      if (result.error) {
        throw new Error(result.error)
      }
    })
}

export default function useDeleteCommentMutation({
  session,
  postingId,
}: {
  session: Session | null
  postingId: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ postingId, commentId, type }: DeleteCommentParams) =>
      deleteComment({ postingId, commentId, type }),
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
