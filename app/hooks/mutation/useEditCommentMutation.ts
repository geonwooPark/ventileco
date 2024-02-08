import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface EditCommentParams {
  postingId: string
  commentId: string
  text: string
  type: 'origin' | 'reply'
}

const editComment = async ({
  postingId,
  commentId,
  text,
  type,
}: EditCommentParams) => {
  await fetch(type === 'origin' ? '/api/comment' : '/api/reply-comment', {
    method: 'PATCH',
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

export default function useEditCommentMutation({
  session,
  postingId,
}: {
  session: Session | null
  postingId: string
}) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ postingId, commentId, text, type }: EditCommentParams) =>
      editComment({ postingId, commentId, text, type }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: detailKeys.comment(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myComment(session?.user.id),
      })
    },
  })

  return { mutation }
}
