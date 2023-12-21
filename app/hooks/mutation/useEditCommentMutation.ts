import { commentsKey, myCommentKeys } from '@/app/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface EditCommentParams {
  session: Session | null
  postingId: string
  selectedCommentIdForEdit: string
  text: string
}

const editComment = async ({
  session,
  postingId,
  selectedCommentIdForEdit,
  text,
}: EditCommentParams) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'PATCH',
    body: JSON.stringify({
      postingId,
      commentId: selectedCommentIdForEdit,
      currentUser: session?.user,
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
}: Pick<EditCommentParams, 'session' | 'postingId'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({
      session,
      postingId,
      selectedCommentIdForEdit,
      text,
    }: EditCommentParams) =>
      editComment({ session, postingId, selectedCommentIdForEdit, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKey.comments(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myCommentKeys.myComment(session?.user.id),
      })
    },
  })

  return { mutation }
}
