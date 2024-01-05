import { detailKeys, myPageKeys } from '@/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface DeleteCommentParams {
  session: Session | null
  postingId: string
  selectedCommentIdForDeletion: string
}

const deleteComment = async ({
  session,
  postingId,
  selectedCommentIdForDeletion,
}: DeleteCommentParams) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'DELETE',
    body: JSON.stringify({
      postingId,
      commentId: selectedCommentIdForDeletion,
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
}: Pick<DeleteCommentParams, 'session' | 'postingId'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({
      session,
      postingId,
      selectedCommentIdForDeletion,
    }: DeleteCommentParams) =>
      deleteComment({ session, postingId, selectedCommentIdForDeletion }),
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
