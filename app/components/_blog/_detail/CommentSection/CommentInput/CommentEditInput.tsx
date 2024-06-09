import React, { useState } from 'react'
import Button from '@common/Button'
import useEditCommentMutation from '@/hooks/mutation/useEditCommentMutation'
import { useSession } from 'next-auth/react'
import { useAlert } from '@/hooks/useAlert'

interface CommentInputProps {
  commentText: string
  postingId: string
  commentId: string
  userId: string
  type: 'origin' | 'reply'
  setSelectedCommentIdForEdit: React.Dispatch<React.SetStateAction<string>>
}

export default function CommentEditInput({
  commentText,
  postingId,
  commentId,
  userId,
  type,
  setSelectedCommentIdForEdit,
}: CommentInputProps) {
  const { data: session } = useSession()
  const alert = useAlert()

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
    if (!session || userId !== session.user.id) return

    editCommentMutation.mutate(
      {
        postingId,
        commentId,
        text,
        type,
      },
      {
        onSuccess: () => {
          setSelectedCommentIdForEdit('')
        },
        onError: (error) => {
          alert.error(error.message)
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
        className="w-full resize-none rounded-md border border-brown-normal px-3 py-2 text-sm text-brown-dark outline-none placeholder:text-beige-light disabled:cursor-not-allowed"
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
