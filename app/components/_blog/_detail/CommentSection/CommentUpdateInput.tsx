import React, { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import {
  useSelectedCommentForEditActions,
  useSelectedCommentIdForEdit,
} from '@/app/hooks/store/useSelectedCommentForEditStore'
import Button from '@/app/components/common/Button'

interface CommentInputProps {
  session: Session | null
  commentText: string
  postingId: string
}

const editComment = async (
  session: Session | null,
  postingId: string,
  commentId: string,
  text: string,
) => {
  if (!session) return

  await fetch('/api/comment', {
    method: 'PATCH',
    body: JSON.stringify({
      postingId,
      commentId,
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

export default function CommentUpdateInput({
  session,
  commentText,
  postingId,
}: CommentInputProps) {
  const selectedCommentIdForEdit = useSelectedCommentIdForEdit()
  const { onReset: resetSelectedCommentIdForEdit } =
    useSelectedCommentForEditActions()

  const [text, setText] = useState(commentText)

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = e.target
    setText(value)
  }

  const queryClient = useQueryClient()
  const { mutate: editCommentMutation } = useMutation({
    mutationFn: () =>
      editComment(session, postingId, selectedCommentIdForEdit, text),
    onSuccess: () => {
      if (!session) return
      queryClient.invalidateQueries({ queryKey: ['comments', { postingId }] })
      queryClient.invalidateQueries({
        queryKey: ['my-comment', { user: session.user.id }],
      })
      resetSelectedCommentIdForEdit()
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  return (
    <div className="mb-4 flex gap-2">
      <textarea
        cols={30}
        rows={3}
        value={text}
        disabled={session ? false : true}
        className="w-full resize-none rounded border px-3 py-2 text-sm outline-none disabled:cursor-not-allowed"
        onChange={onChange}
      />
      <Button
        type="button"
        level="primary"
        size="s"
        label="댓글 수정"
        className="w-24 font-normal"
        onClick={() => editCommentMutation()}
        disabled={session ? false : true}
      />
    </div>
  )
}
