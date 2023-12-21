import {
  commentsKey,
  myCommentKeys,
  myCommentedPostKeys,
} from '@/app/constants/queryKey'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Session } from 'next-auth'

interface PostCommentParams {
  session: Session | null
  postingId: string
  text: string
}

const postComment = async ({ session, postingId, text }: PostCommentParams) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'POST',
    body: JSON.stringify({
      postingId: postingId,
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

export default function usePostCommentMutation({
  session,
  postingId,
}: Pick<PostCommentParams, 'session' | 'postingId'>) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: ({ session, postingId, text }: PostCommentParams) =>
      postComment({ session, postingId, text }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: commentsKey.comments(postingId),
      })
      queryClient.invalidateQueries({
        queryKey: myCommentKeys.myComment(session?.user.id),
      })
      queryClient.invalidateQueries({
        queryKey: myCommentedPostKeys.myCommentedPost(session?.user.id),
      })
    },
  })
  return { mutation }
}
