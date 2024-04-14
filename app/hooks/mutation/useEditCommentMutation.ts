import { commonKeys, myPageKeys } from '@/constants/queryKey'
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
  const result = await fetch(
    type === 'origin' ? '/api/comment' : '/api/reply-comment',
    {
      method: 'PATCH',
      body: JSON.stringify({
        postingId,
        commentId,
        text,
      }),
    },
  )
  if (!result.ok) throw new Error('댓글 수정에 실패했습니다!')
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
        queryKey: commonKeys.comment(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myPageKeys.myComment(session?.user.id),
      })
    },
  })

  return { mutation }
}
