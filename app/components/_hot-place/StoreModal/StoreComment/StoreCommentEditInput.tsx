import React, { useState } from 'react'
import { IconChat } from '../../../../../public/svgs/icons'
import { useSession } from 'next-auth/react'
import useEditCommentMutation from '@/hooks/mutation/useEditCommentMutation'
import { useAlert } from '@/hooks/useAlert'

interface StoreCommentEditInputProps {
  commentText: string
  storeId: string
  commentId: string
  userId: string
  type: 'origin' | 'reply'
  setSelectedCommentIdForEdit: React.Dispatch<React.SetStateAction<string>>
}

export default function StoreCommentEditInput({
  commentText,
  storeId,
  commentId,
  userId,
  type,
  setSelectedCommentIdForEdit,
}: StoreCommentEditInputProps) {
  const { data: session } = useSession()
  const alert = useAlert()

  const [text, setText] = useState(commentText)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    setText(value)
  }

  const { mutation: editCommentMutation } = useEditCommentMutation({
    session,
    postingId: storeId,
  })

  const editComment = () => {
    if (!session || userId !== session.user.id) return

    editCommentMutation.mutate(
      {
        postingId: storeId,
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
    <div className="flex items-center">
      <input
        value={text}
        onChange={onChange}
        className="h-[40px] w-full p-2 text-sm outline-none"
      />
      <button
        type="button"
        onClick={editComment}
        className="size-8 p-1 outline-none"
      >
        <IconChat />
      </button>
    </div>
  )
}
