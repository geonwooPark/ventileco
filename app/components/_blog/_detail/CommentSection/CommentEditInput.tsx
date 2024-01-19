import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { Session } from 'next-auth'
import {
  useSelectedCommentForEditActions,
  useSelectedCommentIdForEdit,
} from '@/hooks/store/useSelectedCommentForEditStore'
import Button from '@common/Button'
import useEditCommentMutation from '@/hooks/mutation/useEditCommentMutation'

interface CommentInputProps {
  session: Session | null
  commentText: string
  postingId: string
}

export default function CommentEditInput({
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

  const { mutation: editCommentMutation } = useEditCommentMutation({
    session,
    postingId,
  })

  const editComment = () => {
    editCommentMutation.mutate(
      {
        session,
        postingId,
        selectedCommentIdForEdit,
        text,
      },
      {
        onSuccess: () => resetSelectedCommentIdForEdit(),
        onError: (error) => {
          toast.error(error.message)
        },
      },
    )
  }

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
        onClick={editComment}
        disabled={session ? false : true}
      />
    </div>
  )
}
