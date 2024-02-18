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
  const result = await fetch(
    commentId ? '/api/blog/reply-comment' : '/api/blog/comment',
    {
      method: 'POST',
      body: JSON.stringify({
        postingId,
        commentId,
        text,
      }),
    },
  )
  if (!result.ok) {
    throw new Error('댓글 작성에 실패했습니다!')
  }
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
