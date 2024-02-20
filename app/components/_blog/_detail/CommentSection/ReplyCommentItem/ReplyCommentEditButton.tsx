import { useSession } from 'next-auth/react'
import React from 'react'

interface ReplyCommentEditButtonProps {
  replyCommentId: string
  userId: string
  selectedCommentIdForEdit: string
  setSelectedCommentIdForEdit: React.Dispatch<React.SetStateAction<string>>
}

export default function ReplyCommentEditButton({
  replyCommentId,
  userId,
  selectedCommentIdForEdit,
  setSelectedCommentIdForEdit,
}: ReplyCommentEditButtonProps) {
  const { data: session } = useSession()

  const handleEditMode = () => {
    if (!session || userId !== session.user.id) return
    if (selectedCommentIdForEdit === replyCommentId) {
      setSelectedCommentIdForEdit('')
    } else {
      setSelectedCommentIdForEdit(replyCommentId)
    }
  }

  return (
    <button onClick={handleEditMode}>
      {selectedCommentIdForEdit === replyCommentId ? '취소' : '수정'}
    </button>
  )
}
