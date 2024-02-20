import { useSession } from 'next-auth/react'
import React from 'react'

interface CommentEditButtonProps {
  commentId: string
  userId: string
  selectedCommentIdForEdit: string
  setSelectedCommentIdForEdit: React.Dispatch<React.SetStateAction<string>>
}

export default function CommentEditButton({
  commentId,
  userId,
  selectedCommentIdForEdit,
  setSelectedCommentIdForEdit,
}: CommentEditButtonProps) {
  const { data: session } = useSession()

  const handleEditMode = () => {
    if (!session || userId !== session.user.id) return
    if (selectedCommentIdForEdit === commentId) {
      setSelectedCommentIdForEdit('')
    } else {
      setSelectedCommentIdForEdit(commentId)
    }
  }

  return (
    <button onClick={handleEditMode}>
      {selectedCommentIdForEdit === commentId ? '취소' : '수정'}
    </button>
  )
}
